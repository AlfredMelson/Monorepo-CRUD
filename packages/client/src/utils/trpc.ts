// faciliate communication with the api
import { AppRouter } from '@insly/api'
import { createReactQueryHooks } from '@trpc/react'
// import exposed AppRouter from the api (i.e. type definitions)

export const trpc = createReactQueryHooks<AppRouter>()
