export const importHome = () => import('@/pages/Home/HomePage')
export const importWork = () => import('@/pages/Work/WorkPage')
export const importContact = () => import('@/pages/Contact/ContactPage')
export const importNotFound = () => import('@/pages/NotFound')
export const importWorkDetail = () => import('@/pages/Detail/WorkDetailPage')

export const preloadTasks = [
  importHome,
  importWork,
  importContact,
  importNotFound,
  importWorkDetail 
]