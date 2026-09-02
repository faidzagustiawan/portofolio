import Navbar from '@/components/Layout/Navbar'
import Footer from '@/components/Layout/Footer'
import FloatingCV from '@/components/Layout/FloatingCV'

export default function AppLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-950">
      <Navbar />
      {/* Pages supply their own <main>, so this is only the skip-link target. */}
      <div id="main-content" className="grow">
        {children}
      </div>
      <Footer />
      <FloatingCV />
    </div>
  )
}
