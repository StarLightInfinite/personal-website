import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/hooks/useLanguage'
import { ExternalLink, ArrowRight } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: '聚合 AIGC 平台',
    subtitle: '企业级 AI 工具中台',
    enSubtitle: 'Enterprise AIGC Platform',
    desc: '整合文生图、AI口播、视频创作、语音处理、资产管理的企业AIGC工具中台，提升团队人效30%，40余人使用',
    enDesc: 'Enterprise AIGC platform integrating text-to-image, AI voiceover, video creation, and asset management. 30% efficiency improvement, used by 40+ people',
    image: '/images/project-ai-chat.png',
    tags: ['Stable Diffusion', 'LangChain', 'RAG'],
    year: '2025',
  },
  {
    title: '综合数据中台',
    subtitle: '全链路数据治理平台',
    enSubtitle: 'Unified Data Platform',
    desc: '微服务架构的数据中台，支持数十亿级数据处理，实时玩家交互分析，助力公司月流水达5千万',
    enDesc: 'Microservices data platform supporting billions of data records, real-time player analytics, driving company monthly revenue to ¥50M',
    image: '/images/project-data-viz.png',
    tags: ['微服务', '大数据', 'BI'],
    year: '2024',
  },
  {
    title: '多渠道发行 SDK',
    subtitle: '跨平台发行解决方案',
    enSubtitle: 'Multi-Channel SDK',
    desc: '安卓/IOS/H5全平台发行SDK，集成头条、广点通、微信小游戏、海外FB/Google/TikTok，热更新秒级响应',
    enDesc: 'Cross-platform publishing SDK for Android/iOS/H5 integrating multiple channels with hot updates',
    image: '/images/project-code-gen.png',
    tags: ['SDK', 'Unity', 'H5'],
    year: '2024',
  },
  {
    title: '企业 AI 客服系统',
    subtitle: 'RAG 智能客服解决方案',
    enSubtitle: 'AI Customer Service',
    desc: '基于RAG技术的企业AI客服，24小时值班，降低人力成本，结合数据埋点自动更新知识库，持续进化',
    enDesc: 'RAG-based enterprise AI customer service, 24/7 support, auto-updating knowledge base with data tracking',
    image: '/images/project-auto-agent.png',
    tags: ['RAG', 'PaddleAI', 'NLP'],
    year: '2023',
  },
  {
    title: '广告投放管理平台',
    subtitle: '买量数据分析系统',
    enSubtitle: 'Ad Management Platform',
    desc: '整合多渠道广告投放数据，解决access_token调度问题，支持实时归因分析，助力公司流水从3千万到8千万',
    enDesc: 'Multi-channel ad management platform solving token scheduling issues, supporting real-time attribution',
    image: '/images/project-blockchain.png',
    tags: ['Node.js', 'MySQL', 'Redis'],
    year: '2023',
  },
  {
    title: 'AI 玩家行为预测',
    subtitle: '机器学习预测引擎',
    enSubtitle: 'Player Behavior AI',
    desc: '基于PaddleAI/Pytorch的LTV预测、购买力预测、流失预测系统，助力精细化运营和关键行为识别',
    enDesc: 'LTV prediction, purchase power prediction, and churn prediction using PaddleAI/PyTorch for refined operations',
    image: '/images/project-creative.png',
    tags: ['Pytorch', 'PaddleAI', 'ML'],
    year: '2023',
  },
]

export default function ProjectGallery() {
  const { t, lang } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = canvas.width = canvas.offsetWidth
    let h = canvas.height = canvas.offsetHeight
    const particles: Array<{ x: number; y: number; vx: number; vy: number; r: number; alpha: number }> = []

    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.3 + 0.1,
      })
    }

    let raf: number
    function animate() {
      ctx!.clearRect(0, 0, w, h)
      particles.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0
        ctx!.beginPath()
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(184, 146, 106, ${p.alpha + Math.sin(Date.now() * 0.001 + p.x) * 0.05})`
        ctx!.fill()
      })
      raf = requestAnimationFrame(animate)
    }
    animate()

    const onResize = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [])

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.gallery-title', { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '.gallery-title', start: 'top 85%' },
      })
      const cards = trackRef.current!.querySelectorAll('.project-card')
      cards.forEach((card, i) => {
        gsap.fromTo(card, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, delay: i * 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: card, start: 'top 88%' },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="works" className="relative py-32 md:py-40 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, hsl(220 13% 5%) 0%, hsl(220 16% 7%) 50%, hsl(220 13% 5%) 100%)' }} />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--forge-gold)) 1px, transparent 0)', backgroundSize: '48px 48px' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, hsl(32 32% 57% / 0.04) 0%, transparent 60%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="gallery-title flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-20 gap-6">
          <div>
            <span className="font-mono text-xs tracking-[0.3em] text-[hsl(var(--forge-gold))] uppercase block mb-4">
              {t('作品画廊', 'Project Gallery')}
            </span>
            <h2 className="font-display text-4xl md:text-6xl font-medium text-[hsl(var(--forge-mist))]">
              {t('落地案例', 'Selected')}
              <span className="forge-text-gold ml-3">Works</span>
            </h2>
          </div>
          <p className="text-[hsl(var(--forge-cool))] max-w-md text-sm leading-relaxed">
            {t('6 组 AI 应用与全栈落地项目，涵盖对话系统、数据可视化、代码生成、自主代理、链上分析与创意内容。', '6 AI & full-stack projects covering chat systems, data viz, code generation, autonomous agents, blockchain analytics, and creative content.')}
          </p>
        </div>

        <div ref={trackRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <div key={i} className="project-card group relative overflow-hidden" style={{ background: 'hsl(220 16% 8%)', border: '1px solid hsl(220 16% 18%)' }}>
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-[hsl(var(--forge-deep)/0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 flex items-center justify-center border border-[hsl(var(--forge-mist)/0.3)] text-[hsl(var(--forge-mist))] backdrop-blur-sm">
                    <ExternalLink size={18} />
                  </div>
                </div>
                <div className="absolute top-4 left-4 font-mono text-[10px] tracking-wider text-[hsl(var(--forge-mist))] bg-[hsl(var(--forge-deep)/0.6)] backdrop-blur-sm px-2 py-1 border border-[hsl(var(--border)/0.3)]">
                  {project.year}
                </div>
                <div className="absolute top-4 right-4 font-display text-3xl text-[hsl(var(--forge-mist)/0.08)] font-medium">
                  0{i + 1}
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-mono text-sm text-[hsl(var(--forge-mist))]">{project.title}</h3>
                  <ArrowRight size={14} className="text-[hsl(var(--forge-cool))] opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300" />
                </div>
                <p className="text-xs text-[hsl(var(--forge-gold))] mb-2">{lang === 'zh' ? project.subtitle : project.enSubtitle}</p>
                <p className="text-xs text-[hsl(var(--forge-cool))] leading-relaxed mb-4 line-clamp-2">{lang === 'zh' ? project.desc : project.enDesc}</p>
                <div className="flex flex-wrap gap-1.5 pt-4" style={{ borderTop: '1px solid hsl(220 16% 18%)' }}>
                  {project.tags.map((tag) => (
                    <span key={tag} className="forge-tag text-[10px] py-0.5 px-2">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-[hsl(var(--forge-cyan))] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
