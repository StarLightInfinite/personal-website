import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/hooks/useLanguage'
import { Send, Mail, Globe, Feather, MessageCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const techTags = [
  'AI Agent', 'LLM', 'RAG', 'Full-Stack', 'SaaS',
  'Next.js', 'Python', 'TypeScript', 'Cloud', 'MVP',
]

export default function ContactSection() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = canvas.width = canvas.offsetWidth
    let h = canvas.height = canvas.offsetHeight
    let rings: Array<{ x: number; y: number; r: number; speed: number; maxR: number }> = []

    for (let i = 0; i < 5; i++) {
      rings.push({
        x: w * 0.3,
        y: h * 0.5,
        r: i * 40,
        speed: 0.3 + i * 0.1,
        maxR: 300 + i * 50,
      })
    }

    let raf: number
    function animate() {
      ctx!.clearRect(0, 0, w, h)
      rings.forEach((ring) => {
        ring.r += ring.speed
        if (ring.r > ring.maxR) ring.r = 0
        ctx!.beginPath()
        ctx!.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2)
        ctx!.strokeStyle = `rgba(88, 166, 255, ${0.15 * (1 - ring.r / ring.maxR)})`
        ctx!.lineWidth = 0.5
        ctx!.stroke()
      })
      raf = requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-content', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.contact-content', start: 'top 80%' },
      })
      gsap.fromTo('.contact-tag', { rotateY: -90, opacity: 0 }, {
        rotateY: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: '.tags-wrap', start: 'top 85%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section ref={sectionRef} id="contact" className="relative py-32 md:py-40 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, hsl(220 13% 6%) 0%, hsl(220 16% 9%) 50%, hsl(220 13% 5%) 100%)' }} />
      <div className="absolute inset-0 opacity-30" style={{ background: 'radial-gradient(ellipse at 30% 50%, hsl(210 100% 67% / 0.1) 0%, transparent 60%)' }} />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(0deg, transparent 49%, hsl(var(--forge-cyan)) 49%, hsl(var(--forge-cyan)) 51%, transparent 51%)', backgroundSize: '100% 60px' }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 contact-content">
        <div className="text-center mb-16">
          <span className="font-mono text-xs tracking-[0.3em] text-[hsl(var(--forge-cyan))] uppercase">
            {t('合作对接', 'Collaboration')}
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-medium mt-4 text-[hsl(var(--forge-mist))]">
            {t('建立', 'Start a')}
            <span className="forge-text-gold ml-3">{t('连接', 'Connection')}</span>
          </h2>
          <p className="mt-4 text-[hsl(var(--forge-cool))] max-w-lg mx-auto">
            {t('无论是技术咨询、产品合作还是创业交流，欢迎随时联系。', 'Open for tech consulting, product collaboration, and startup discussions.')}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-mono text-xs text-[hsl(var(--forge-cool))] mb-2 tracking-wider">{t('称呼 / NAME', 'Name')}</label>
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="forge-input w-full px-4 py-3 text-sm" placeholder={t('您的称呼', 'Your name')} required />
            </div>
            <div>
              <label className="block font-mono text-xs text-[hsl(var(--forge-cool))] mb-2 tracking-wider">{t('邮箱 / EMAIL', 'Email')}</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="forge-input w-full px-4 py-3 text-sm" placeholder={t('your@email.com', 'your@email.com')} required />
            </div>
          </div>
          <div>
            <label className="block font-mono text-xs text-[hsl(var(--forge-cool))] mb-2 tracking-wider">{t('消息 / MESSAGE', 'Message')}</label>
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="forge-input w-full px-4 py-3 text-sm min-h-[140px] resize-none" placeholder={t('描述您的项目需求或合作想法...', 'Describe your project or collaboration idea...')} required />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button type="submit" className="forge-btn px-8 py-3 font-mono text-sm tracking-wider flex items-center gap-2">
              <span className="relative z-10">{sent ? t('已发送', 'Sent') : t('发送消息', 'Send Message')}</span>
              <Send size={14} className="relative z-10" />
            </button>
            <div className="flex items-center gap-4">
              {[{ icon: Globe, href: '#' }, { icon: Feather, href: '#' }, { icon: MessageCircle, href: '#' }, { icon: Mail, href: '#' }].map((s, i) => (
                <a key={i} href={s.href} className="w-10 h-10 flex items-center justify-center border border-[hsl(var(--border))] text-[hsl(var(--forge-cool))] hover:text-[hsl(var(--forge-cyan))] hover:border-[hsl(var(--forge-cyan)/0.5)] transition-colors">
                  <s.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </form>

        <div className="tags-wrap mt-16">
          <p className="font-mono text-xs text-[hsl(var(--forge-cool))] mb-4 tracking-wider text-center">{t('技术标签 / TECH TAGS', 'Tech Tags')}</p>
          <div className="flex flex-wrap justify-center gap-3" style={{ perspective: '800px' }}>
            {techTags.map((tag) => (
              <span key={tag} className="contact-tag forge-tag cursor-default hover:border-[hsl(var(--forge-cyan)/0.5)] hover:text-[hsl(var(--forge-cyan))]" style={{ transformStyle: 'preserve-3d' }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
