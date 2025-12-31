import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { PageTransitionProvider } from '@/context/PageTransitionContext'


if (!window.__HELLO_SHOWN__) {
  window.__HELLO_SHOWN__ = false
}

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <PageTransitionProvider>
          <App />
      </PageTransitionProvider>
    </BrowserRouter>
,
)
