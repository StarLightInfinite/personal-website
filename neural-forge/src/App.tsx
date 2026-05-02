import { useState, useCallback } from 'react'
import { LangProvider } from '@/hooks/useLanguage'
import { LenisProvider } from '@/hooks/useLenis'
import Loader from '@/components/Loader'
import CustomCursor from '@/components/CustomCursor'
import Navigation from '@/components/Navigation'
import HeroSection from '@/components/HeroSection'
import TechMatrix from '@/components/TechMatrix'
import DevPrologue from '@/components/DevPrologue'
import ProjectGallery from '@/components/ProjectGallery'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

function AppContent() {
  const [loaded, setLoaded] = useState(false)

  const handleLoadComplete = useCallback(() => {
    setLoaded(true)
  }, [])

  return (
    <>
      {!loaded && <Loader onComplete={handleLoadComplete} />}
      <CustomCursor />
      <Navigation />
      <main>
        <HeroSection />
        <TechMatrix />
        <DevPrologue />
        <ProjectGallery />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}

function App() {
  return (
    <LangProvider>
      <LenisProvider>
        <AppContent />
      </LenisProvider>
    </LangProvider>
  )
}

export default App
