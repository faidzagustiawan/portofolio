import Navbar from '@/components/Layout/Navbar'
import Footer from '@/components/Layout/Footer'
import FloatingCV from '@/components/Layout/FloatingCV'
import { Toaster } from 'react-hot-toast'

export default function AppLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="grow">{children}</main>
      <Footer />
      <FloatingCV />
      <Toaster position="bottom-right" />

    </div>
  )
}

