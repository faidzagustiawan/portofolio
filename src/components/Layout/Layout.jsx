import Navbar from '@/components/Layout/Navbar'
import Footer from '@/components/Layout/Footer'
import FloatingCV from '@/components/Layout/FloatingCV'

export default function AppLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="grow">{children}</main>
      <Footer />
      <FloatingCV />
    </div>
  )
}
