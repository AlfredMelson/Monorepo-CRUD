import express, { Request, Response } from 'express'
import * as trpc from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import cors from 'cors'
import { z } from 'zod'
import { v4 as uuidv4 } from 'uuid'
import { IUser } from './model/users'
import users from './model/users.json'

const userDB = {
  allUsers: users,
  setAllUsers: function (data: IUser[]) {
    this.allUsers = data
  }
}

const appRouter = trpc
  .router()
  .query('hello', {
    resolve() {
      return 'Hello world III'
    }
  })
  // read all users
  .query('getUsers', {
    resolve() {
      // slice the last 10 users
      return userDB.allUsers
    }
  })
  // read last 10 users
  // .query('getUsers', {
  //   // initial input value set to 10 by default
  //   input: z.number().default(10),
  //   resolve({ input }: any) {
  //     // slice the last 10 users
  //     return userDB.allUsers.slice(-input)
  //   }
  // })
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
      users.push({ userId, firstname, lastname, email, street, city, country })
      return input
    }
  })

export type AppRouter = typeof appRouter

const app = express()
app.use(cors())
const port = 8080

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => null
  })
)

app.get('/', (_req: Request, res: Response) => {
  res.send('Hello from api-server')
})

app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`)
})
