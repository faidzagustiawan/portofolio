import { Routes, Route } from 'react-router-dom'
import { lazy } from 'react'
import {
  importHome,
  importWork,
  importContact,
  importNotFound,
  importWorkDetail // 1. Import fungsi ini
} from '@/hooks/preloadTasks'

const Home = lazy(importHome)
const Work = lazy(importWork)
const Contact = lazy(importContact)
const NotFound = lazy(importNotFound)
const ProjectDetail = lazy(importWorkDetail) // 2. Buat Lazy component

export default function AppRoutes({ location }) {
  return (
    <Routes location={location}>
      <Route path="/" element={<Home />} />
      <Route path="/work" element={<Work />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/work/:slug" element={<ProjectDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
