import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/hooks/useLanguage'
import { useLenisInstance } from '@/hooks/useLenis'
import { Menu, X } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const navItems = [
  { zh: '首屏', en: 'Hero', href: '#hero' },
  { zh: '技术矩阵', en: 'Tech', href: '#tech' },
  { zh: '序章', en: 'About', href: '#about' },
  { zh: '作品', en: 'Works', href: '#works' },
  { zh: '联络', en: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const { lang, toggleLang, t } = useLanguage()
  const lenis = useLenisInstance()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!navRef.current) return
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 2.5, ease: 'power3.out' }
    )
  }, [])

  const handleClick = (href: string) => {
    setMobileOpen(false)
    if (lenis) {
      lenis.scrollTo(href)
    } else {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'forge-glass-strong py-3' : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleClick('#hero') }}
          className="font-display text-xl font-semibold tracking-tight"
        >
          <span className="forge-text-gold">Neural</span>
          <span className="text-[hsl(var(--forge-mist))] ml-1">Forge</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => { e.preventDefault(); handleClick(item.href) }}
              className="relative font-mono text-xs tracking-wider text-[hsl(var(--forge-cool))] hover:text-[hsl(var(--forge-mist))] transition-colors group"
            >
              {t(item.zh, item.en)}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[hsl(var(--forge-cyan))] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <button
            onClick={toggleLang}
            className="font-mono text-xs tracking-wider px-3 py-1 border border-[hsl(var(--border))] text-[hsl(var(--forge-cool))] hover:text-[hsl(var(--forge-cyan))] hover:border-[hsl(var(--forge-cyan)/0.5)] transition-colors"
          >
            {lang === 'zh' ? 'EN' : '中文'}
          </button>
        </div>

        <button
          className="md:hidden text-[hsl(var(--forge-mist))]"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden forge-glass-strong mt-3 mx-6 p-6 space-y-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => { e.preventDefault(); handleClick(item.href) }}
              className="block font-mono text-sm text-[hsl(var(--forge-cool))] hover:text-[hsl(var(--forge-mist))]"
            >
              {t(item.zh, item.en)}
            </a>
          ))}
          <button
            onClick={toggleLang}
            className="font-mono text-xs px-3 py-1 border border-[hsl(var(--border))] text-[hsl(var(--forge-cool))]"
          >
            {lang === 'zh' ? 'EN' : '中文'}
          </button>
        </div>
      )}
    </nav>
  )
}
