import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/hooks/useLanguage'
import { Calendar, MapPin, Award, Rocket } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const timeline = [
  {
    period: '2024 — NOW',
    title: '独立开发者 / Indie Developer',
    desc: '全职独立开发，专注 AI 应用落地与全栈产品孵化',
    enDesc: 'Full-time indie dev, focused on AI applications and full-stack product incubation',
  },
  {
    period: '2022 — 2024',
    title: '高级全栈工程师 / Senior Full-Stack',
    desc: '主导多个 AI SaaS 产品从 0 到 1 的技术架构与团队建设',
    enDesc: 'Led tech architecture and team building for multiple AI SaaS products',
  },
  {
    period: '2019 — 2022',
    title: '前端技术负责人 / Frontend Lead',
    desc: '负责大型数据可视化平台与低代码引擎的前端架构',
    enDesc: 'Frontend architecture for large-scale data viz platforms and low-code engines',
  },
  {
    period: '2017 — 2019',
    title: '全栈开发工程师 / Full-Stack Engineer',
    desc: '参与企业级中台系统开发，积累全链路工程经验',
    enDesc: 'Enterprise mid-platform development, building full-stack engineering experience',
  },
]

export default function DevPrologue() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const hexRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.prologue-title', { x: -60, opacity: 0 }, {
        x: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.prologue-title', start: 'top 80%' },
      })
      gsap.fromTo('.prologue-text', { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.prologue-text', start: 'top 85%' },
      })
      gsap.fromTo('.timeline-item', { x: 40, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: '.timeline-wrap', start: 'top 80%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!hexRef.current) return
    gsap.to(hexRef.current, {
      rotation: 360,
      duration: 120,
      ease: 'none',
      repeat: -1,
    })
  }, [])

  return (
    <section ref={sectionRef} id="about" className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, hsl(220 13% 6%) 0%, hsl(220 16% 8%) 50%, hsl(220 13% 6%) 100%)' }} />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(90deg, transparent 49%, hsl(var(--forge-gold)) 49%, hsl(var(--forge-gold)) 51%, transparent 51%)', backgroundSize: '120px 100%' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 10% 50%, hsl(32 32% 57% / 0.06) 0%, transparent 50%)' }} />

      {/* Rotating hexagon */}
      <svg
        ref={hexRef}
        className="absolute -right-32 top-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[700px] md:h-[700px] opacity-[0.04] pointer-events-none"
        viewBox="0 0 200 200"
      >
        <polygon
          points="100,10 190,55 190,145 100,190 10,145 10,55"
          fill="none"
          stroke="hsl(var(--forge-gold))"
          strokeWidth="0.5"
        />
        <polygon
          points="100,35 165,65 165,135 100,165 35,135 35,65"
          fill="none"
          stroke="hsl(var(--forge-cyan))"
          strokeWidth="0.3"
        />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <span className="prologue-title font-mono text-xs tracking-[0.3em] text-[hsl(var(--forge-gold))] uppercase block">
              {t('开发序章', 'Prologue')}
            </span>
            <h2 className="prologue-title font-display text-4xl md:text-5xl lg:text-6xl font-medium mt-4 text-[hsl(var(--forge-mist))] leading-tight">
              {t('关于', 'About')}
              <span className="forge-text-gold block mt-1">Neural Forge</span>
            </h2>

            <div className="mt-10 space-y-6">
              <p className="prologue-text text-[hsl(var(--forge-cool))] leading-relaxed text-lg">
                {t('我相信技术的终极价值在于创造。从一行代码到一个产品，从一次推理到一次变革，每一个数字造物都承载着改变现实世界的潜能。', 'I believe the ultimate value of technology lies in creation. From a line of code to a product, from inference to transformation.')}
              </p>
              <p className="prologue-text text-[hsl(var(--forge-cool))] leading-relaxed">
                {t('作为独立开发者，我专注于将前沿 AI 能力转化为可落地、可规模化的商业产品。不追逐概念，只交付结果。', 'As an indie developer, I focus on turning cutting-edge AI capabilities into scalable, commercial products.')}
              </p>
            </div>

            <div className="prologue-text mt-10 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-[hsl(var(--forge-cool))]">
                <MapPin size={14} className="text-[hsl(var(--forge-cyan))]" />
                <span className="font-mono text-xs">Remote / 全球远程</span>
              </div>
              <div className="flex items-center gap-2 text-[hsl(var(--forge-cool))]">
                <Calendar size={14} className="text-[hsl(var(--forge-cyan))]" />
                <span className="font-mono text-xs">7+ Years</span>
              </div>
              <div className="flex items-center gap-2 text-[hsl(var(--forge-cool))]">
                <Award size={14} className="text-[hsl(var(--forge-gold))]" />
                <span className="font-mono text-xs">20+ Products</span>
              </div>
              <div className="flex items-center gap-2 text-[hsl(var(--forge-cool))]">
                <Rocket size={14} className="text-[hsl(var(--forge-teal))]" />
                <span className="font-mono text-xs">AI First</span>
              </div>
            </div>
          </div>

          <div className="timeline-wrap relative">
            <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-[hsl(var(--border))]" />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <div key={i} className="timeline-item relative pl-8">
                  <div className="absolute left-0 top-2 w-2 h-2 -translate-x-[3px] rounded-full bg-[hsl(var(--forge-gold))] ring-4 ring-[hsl(var(--forge-deep))]" />
                  <span className="font-mono text-xs text-[hsl(var(--forge-cyan))] tracking-wider">{item.period}</span>
                  <h4 className="mt-1 font-mono text-sm text-[hsl(var(--forge-mist))]">{item.title}</h4>
                  <p className="mt-1 text-sm text-[hsl(var(--forge-cool))] leading-relaxed">{t(item.desc, item.enDesc)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
