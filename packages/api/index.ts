import express from 'express'
import * as trpc from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import cors from 'cors'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'
import users from './model/users.json'
import fsPromises from 'fs/promises'
import path from 'path'

const userDB = {
  allUsers: users,
  setAllUsers: function (data: any) {
    this.allUsers = data
  }
}

const appRouter = trpc
  .router()

  // read all users
  .query('getUsers', {
    resolve() {
      return userDB.allUsers
    }
  })

  // create user
  .mutation('addUser', {
    input: z.object({
      firstname: z.string(),
      lastname: z.string(),
      email: z.string(),
      street: z.string(),
      city: z.string(),
      country: z.string()
    }),
    resolve({ input }: Record<string, any>) {
      const userId: string = uuidv4()
      const newUser = {
        userId,
        ...input
      }
      userDB.setAllUsers([...userDB.allUsers, newUser])
      // write the new user to the database
      fsPromises.writeFile(
        // navigate from the current directory into the model directory
        path.join(__dirname, 'model', 'users.json'),
        // specify the data to be written
        JSON.stringify(userDB.allUsers)
      )
      return newUser
    }
  })

export type AppRouter = typeof appRouter

async function main() {
  // express implementation
  const app = express()
  // cors implementation
  app.use(cors())

  app.use((req, _res, next) => {
    // request logger
    console.log('⬅️ ', req.method, req.path, req.body ?? req.query)

    next()
  })

  app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext: () => null
      // createContext
    })
  )
  app.get('/', (_req, res) => res.send('hello'))

  // utilise the port aws provides or 8080
  const port = process.env.PORT || 8080

  app.listen(port, () => {
    console.log(`api-server listening at http://localhost:${port}`)
  })
}

main()
