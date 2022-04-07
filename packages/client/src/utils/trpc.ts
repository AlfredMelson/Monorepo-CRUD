import { AppRouter } from '@insly/api'
import { createReactQueryHooks } from '@trpc/react'
/*
 * Purpose:
 * createReactQueryHooks helper from trpc to will enable the creation of hooks that are specific to the api/server
 * import exposed AppRouter from the api/server, that has type definitions
 */

export const trpc = createReactQueryHooks<AppRouter>()
