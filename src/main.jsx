import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import './index.css'
import AuthProvider from './providers/AuthProvider.jsx'
import routes from './routes/Routes.jsx'

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'

// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <RouterProvider router={routes}>
    <App />
    </RouterProvider>
    </AuthProvider>
    </QueryClientProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
