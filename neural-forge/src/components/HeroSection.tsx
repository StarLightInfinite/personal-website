import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useLanguage } from '@/hooks/useLanguage'
import { useLenisInstance } from '@/hooks/useLenis'
import { ArrowDown, Terminal, Cpu, Zap } from 'lucide-react'

export default function HeroSection() {
  const { t } = useLanguage()
  const lenis = useLenisInstance()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  const scrollTo = (href: string) => {
    if (lenis) {
      lenis.scrollTo(href)
    } else {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = canvas.width = window.innerWidth
    let h = canvas.height = window.innerHeight
    let particles: Array<{
      x: number; y: number; vx: number; vy: number; size: number; alpha: number; char: string
    }> = []
    const chars = '01{}[]<>/\\|;:+=-*&^%$#@!?~`'

    function createParticle() {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 12 + 8,
        alpha: Math.random() * 0.5 + 0.1,
        char: chars[Math.floor(Math.random() * chars.length)],
      }
    }

    for (let i = 0; i < 80; i++) particles.push(createParticle())

    let mouseX = w / 2, mouseY = h / 2
    const onMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY }
    window.addEventListener('mousemove', onMove)

    let raf: number
    function animate() {
      ctx!.clearRect(0, 0, w, h)
      particles.forEach((p) => {
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 200) {
          p.vx -= dx * 0.0001
          p.vy -= dy * 0.0001
        }
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        ctx!.font = `${p.size}px "Courier Prime", monospace`
        ctx!.fillStyle = `rgba(88, 166, 255, ${p.alpha})`
        ctx!.fillText(p.char, p.x, p.y)
      })

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx!.strokeStyle = `rgba(88, 166, 255, ${0.08 * (1 - dist / 120)})`
            ctx!.lineWidth = 0.5
            ctx!.beginPath()
            ctx!.moveTo(particles[i].x, particles[i].y)
            ctx!.lineTo(particles[j].x, particles[j].y)
            ctx!.stroke()
          }
        }
      }
      raf = requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    if (!textRef.current) return
    const tl = gsap.timeline({ delay: 2.8 })
    tl.fromTo('.hero-line1', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' })
      .fromTo('.hero-line2', { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.7')
      .fromTo('.hero-sub', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.5')
      .fromTo('.hero-badges', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, '-=0.3')
      .fromTo('.hero-scroll', { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.2')
  }, [])

  return (
    <section ref={sectionRef} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ background: 'linear-gradient(180deg, hsl(220 13% 5%) 0%, hsl(220 16% 8%) 100%)' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, hsl(210 100% 67% / 0.06) 0%, transparent 70%)' }} />

      <div ref={textRef} className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <div className="hero-line1 font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-tighter leading-[0.9]">
          <span className="text-[hsl(var(--forge-mist))]">NEURAL</span>
        </div>
        <div className="hero-line2 font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-medium tracking-tighter leading-[0.9] mt-2">
          <span className="forge-text-gold">FORGE</span>
        </div>

        <div className="hero-sub mt-8 md:mt-12">
          <p className="font-mono text-sm md:text-base text-[hsl(var(--forge-cool))] tracking-wider">
            {t('星核造物 / 独立开发者 / AI 全栈工程师', 'Star Core Creator / Indie Dev / AI Full-Stack Engineer')}
          </p>
          <p className="mt-3 text-[hsl(var(--forge-mist))] text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            {t(
              '以代码为锤，以数据为砧，锻造智能时代的数字造物',
              'Forging digital creations of the intelligent era with code and data'
            )}
          </p>
        </div>

        <div className="hero-badges flex flex-wrap justify-center gap-3 mt-8">
          {[
            { icon: Terminal, label: t('全栈开发', 'Full-Stack'), href: '#tech' },
            { icon: Cpu, label: t('AI 工程', 'AI Engineering'), href: '#works' },
            { icon: Zap, label: t('独立产品', 'Indie Products'), href: '#works' },
          ].map((b) => (
            <button
              key={b.label}
              onClick={() => scrollTo(b.href)}
              className="forge-tag gap-2 cursor-pointer hover:border-[hsl(var(--forge-cyan)/0.5)] hover:text-[hsl(var(--forge-cyan))]"
              data-cursor-hover
            >
              <b.icon size={12} className="text-[hsl(var(--forge-cyan))]" />
              {b.label}
            </button>
          ))}
        </div>

        <div className="hero-scroll absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[hsl(var(--forge-cool))]">
          <span className="font-mono text-[10px] tracking-[0.2em] uppercase">{t('向下探索', 'Explore')}</span>
          <ArrowDown size={16} className="animate-bounce" />
        </div>
      </div>
    </section>
  )
}
