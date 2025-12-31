import { createPortal } from 'react-dom'

export default function CursorPortal({ children }) {
  if (typeof window === 'undefined') return null
  return createPortal(children, document.body)
}
