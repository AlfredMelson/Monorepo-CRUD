import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import { AppLayout } from './components'
import { UserProvider } from './context'
import { trpc } from './hooks'
import { Mismatch, Users } from './pages'

function App() {
  const location = useLocation()
  const [queryClient] = useState(() => new QueryClient())

  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: 'http://localhost:8080/trpc'
    })
  )

  return (
    <AnimatePresence exitBeforeEnter>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Routes key={location.pathname}>
            <Route path='/' element={<AppLayout />}>
              {/* public routes */}
              <Route index element={<Users />} />
              {/* mismatch route */}
              <Route path='*' element={<Mismatch />} />
            </Route>
          </Routes>
        </QueryClientProvider>
      </trpc.Provider>
    </AnimatePresence>
  )
}

// create entry point using unique id from Document
const rootElement = document.getElementById('root')
// test for root element prior to invoking ReactDOM.createRoot
if (!rootElement) throw new Error('Failed to find the root element')
// create root
const approot = createRoot(rootElement)
// initial render

approot.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path='/*' element={<App />} />
          </Routes>
        </UserProvider>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
)

