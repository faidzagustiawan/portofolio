import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { MotionConfig } from 'framer-motion'
import { PageTransitionProvider } from '@/context/PageTransitionContext'
import { ProjectsProvider } from '@/context/ProjectsContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* reducedMotion="user" makes every framer-motion transform and layout
        animation respect the OS setting without per-component guards. */}
    <MotionConfig reducedMotion="user">
      <HelmetProvider>
        <BrowserRouter>
          <ProjectsProvider>
            <PageTransitionProvider>
              <App />
            </PageTransitionProvider>
          </ProjectsProvider>
        </BrowserRouter>
      </HelmetProvider>
    </MotionConfig>
  </StrictMode>
)
