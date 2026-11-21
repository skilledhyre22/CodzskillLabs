
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ClientId } from './shared/api/apiEndPoints.ts'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={ClientId}>
      <App />
      <ToastContainer position="top-right" autoClose={3000} />
    </GoogleOAuthProvider>
  </StrictMode>
)

