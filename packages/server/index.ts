import express, { Request, response, Response } from 'express'
import * as trpc from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import cors from 'cors'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'
import { IUser } from './model/users'
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
      const { firstname, lastname, email, street, city, country } = input
      const userId: string = uuidv4()
      const newUser = { userId, firstname, lastname, email, street, city, country }
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

const app = express()
app.use(cors())

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => null
  })
)

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello from Insly api-server')
})

// utilise the port aws provides or 8080
const port = process.env.PORT || 8080

app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`)
})
