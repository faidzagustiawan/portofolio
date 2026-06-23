import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { PageTransitionProvider } from '@/context/PageTransitionContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <PageTransitionProvider>
          <App />
        </PageTransitionProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
