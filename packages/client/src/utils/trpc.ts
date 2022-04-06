// faciliate communication with the api
import { createReactQueryHooks } from '@trpc/react'
// import exposed AppRouter from the api (i.e. type definitions)
import { AppRouter } from 'trpc-api'

export const trpc = createReactQueryHooks<AppRouter>()
