import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/hooks/useLanguage'
import { Calendar, MapPin, Award, Rocket } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const timeline = [
  {
    period: '2025.04 — NOW',
    title: '技术专家 / Tech Expert',
    desc: '广州龙锐科技有限公司，提供发行业务技术支持，开发聚合AIGC工具，优化服务器架构',
    enDesc: 'Guangzhou Longrui Tech - Providing technical support for publishing, developing AIGC tools, optimizing server architecture',
  },
  {
    period: '2025.01 — 2025.03',
    title: '技术专家 / Tech Expert',
    desc: '广州天纵信息技术有限公司，负责投放平台需求开发，解决重点难点问题',
    enDesc: 'Guangzhou Tianzong Tech - Leading ad platform development, solving critical technical challenges',
  },
  {
    period: '2019.08 — 2024.12',
    title: '技术经理 / Tech Manager',
    desc: '广州天蝎互动网络科技有限公司，技术团队管理，架构管控，全业务技术支持',
    enDesc: 'Guangzhou Scorpio Interactive - Tech team management, architecture governance, full-business technical support',
  },
  {
    period: '2016.06 — 2019.08',
    title: 'PHP组长 / PHP Team Lead',
    desc: '广州乐牛软件科技有限公司，游戏研发后台、运营后台、广告发行后台开发',
    enDesc: 'Guangzhou Leniu Software - Game backend, ops backend, ad publishing platform development',
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
              <span className="forge-text-gold block mt-1">星光无限</span>
            </h2>

            <div className="mt-10 space-y-6">
              <p className="prologue-text text-[hsl(var(--forge-cool))] leading-relaxed text-lg">
                {t('11年技术深耕，游戏行业9年经验。覆盖研发、发行、运营、客服、财务全链路，善于用技术推动业务增长。', '11 years of tech experience, 9 years in gaming industry. Full-stack coverage across R&D, publishing, ops, customer service, and finance.')}
              </p>
              <p className="prologue-text text-[hsl(var(--forge-cool))] leading-relaxed">
                {t('百万级高并发实战经验，擅长架构治理、性能优化、数据治理。5年技术管理经验，带领10人团队，降本增效成果显著。', 'Proven experience with million-level concurrency, skilled in architecture governance, performance optimization, and data governance. 5+ years tech management leading 10-person teams.')}
              </p>
              <p className="prologue-text text-[hsl(var(--forge-cool))] leading-relaxed">
                {t('PMP认证，AI大模型开发工程师认证，自研项目获「中国制造2025」国家级奖项及400万资金扶持。', 'PMP certified, AI LLM engineer certified. Self-developed project won "Made in China 2025" national award with ¥4M funding support.')}
              </p>
            </div>

            <div className="prologue-text mt-10 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-[hsl(var(--forge-cool))]">
                <MapPin size={14} className="text-[hsl(var(--forge-cyan))]" />
                <span className="font-mono text-xs">广州 / Guangzhou</span>
              </div>
              <div className="flex items-center gap-2 text-[hsl(var(--forge-cool))]">
                <Calendar size={14} className="text-[hsl(var(--forge-cyan))]" />
                <span className="font-mono text-xs">11+ Years</span>
              </div>
              <div className="flex items-center gap-2 text-[hsl(var(--forge-cool))]">
                <Award size={14} className="text-[hsl(var(--forge-gold))]" />
                <span className="font-mono text-xs">PMP / AI认证</span>
              </div>
              <div className="flex items-center gap-2 text-[hsl(var(--forge-cool))]">
                <Rocket size={14} className="text-[hsl(var(--forge-teal))]" />
                <span className="font-mono text-xs">中国制造2025</span>
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
