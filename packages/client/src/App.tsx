import { AnimatePresence } from 'framer-motion'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AppLayout } from './components'
import { UserProvider } from './context'
import { Mismatch, UserCreation, UserList, UserUpdate } from './pages'
import { trpc } from './trpc'
// import './style/index.css'

const client = new QueryClient()

function App() {
  const location = useLocation()

  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: 'http://localhost:8080/trpc'
    })
  )

  return (
    <AnimatePresence exitBeforeEnter>
      <trpc.Provider client={trpcClient} queryClient={client}>
        <QueryClientProvider client={client}>
          <Routes key={location.pathname}>
            <Route path='/' element={<AppLayout />}>
              {/* public routes */}
              <Route index element={<UserList />} />
              <Route path='update' element={<UserUpdate />} />
              <Route path='create' element={<UserCreation />} />
              {/* mismatch route */}
              <Route path='*' element={<Mismatch />} />
            </Route>
          </Routes>
        </QueryClientProvider>
      </trpc.Provider>
    </AnimatePresence>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
