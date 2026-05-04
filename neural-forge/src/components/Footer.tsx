import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/hooks/useLanguage'
import { ArrowUpRight, Heart } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const footerLinks = [
  {
    title: 'Navigation',
    items: [
      { label: 'Hero', href: '#hero' },
      { label: 'Tech Stack', href: '#tech' },
      { label: 'About', href: '#about' },
      { label: 'Works', href: '#works' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Social',
    items: [
      { label: 'GitHub', href: '#' },
      { label: 'Twitter / X', href: '#' },
      { label: 'LinkedIn', href: '#' },
      { label: 'Discord', href: '#' },
    ],
  },
  {
    title: 'Resources',
    items: [
      { label: 'Blog', href: '#' },
      { label: 'Open Source', href: '#' },
      { label: 'Newsletter', href: '#' },
    ],
  },
]

export default function Footer() {
  const { t } = useLanguage()
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!footerRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-col', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 90%' },
      })
    }, footerRef)
    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="relative pt-24 pb-8 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, hsl(220 13% 5%) 0%, hsl(220 16% 7%) 100%)' }} />
      <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, hsl(var(--forge-gold)/0.3), transparent)' }} />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(0deg, transparent 49%, hsl(var(--forge-gold)) 49%, hsl(var(--forge-gold)) 51%, transparent 51%)', backgroundSize: '100% 40px' }} />
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'radial-gradient(ellipse at 50% 100%, hsl(32 32% 57% / 0.06) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-20">
          <div className="lg:col-span-2 footer-col">
            <div className="font-display text-3xl font-medium">
              <span className="forge-text-gold">星光</span>
              <span className="text-[hsl(var(--forge-mist))] ml-1">无限</span>
            </div>
            <p className="mt-4 text-sm text-[hsl(var(--forge-cool))] max-w-sm leading-relaxed">
              {t('11年技术深耕，用代码和数据创造价值。', '11 years of technical excellence, creating value with code and data.')}
            </p>
            <div className="mt-6 font-mono text-xs text-[hsl(var(--forge-cool))] opacity-60">
              <div>BUILD WITH INTENTION.</div>
              <div>SHIP WITH IMPACT.</div>
            </div>
          </div>

          {footerLinks.map((col) => (
            <div key={col.title} className="footer-col">
              <h4 className="font-mono text-xs tracking-wider text-[hsl(var(--forge-mist))] mb-4">{col.title}</h4>
              <ul className="space-y-3">
                {col.items.map((item) => (
                  <li key={item.label}>
                    <a href={item.href} className="group inline-flex items-center gap-1 text-sm text-[hsl(var(--forge-cool))] hover:text-[hsl(var(--forge-cyan))] transition-colors">
                      {item.label}
                      <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8" style={{ borderTop: '1px solid hsl(var(--border))' }}>
          <div className="font-mono text-xs text-[hsl(var(--forge-cool))] opacity-50">
            &copy; {new Date().getFullYear()} 黄榆钧 / 星光无限. All rights reserved.
          </div>
          <div className="flex items-center gap-1 font-mono text-xs text-[hsl(var(--forge-cool))] opacity-50">
            <span>Made with</span>
            <Heart size={10} className="text-[hsl(var(--forge-gold))]" />
            <span>by AI & Human</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
