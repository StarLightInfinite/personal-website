import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/hooks/useLanguage'
import { Globe, Server, Brain, GitBranch } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const techGroups = [
  {
    title: 'Frontend / 前端架构',
    icon: Globe,
    items: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js / WebGL', 'GSAP / Framer'],
  },
  {
    title: 'Backend / 后端系统',
    icon: Server,
    items: ['Node.js / NestJS', 'Python / FastAPI', 'PostgreSQL', 'Redis', 'GraphQL'],
  },
  {
    title: 'AI / 智能引擎',
    icon: Brain,
    items: ['OpenAI API', 'LangChain', 'Vector DB', 'Fine-tuning', 'RAG Pipeline'],
  },
  {
    title: 'DevOps / 工程化',
    icon: GitBranch,
    items: ['Docker / K8s', 'CI/CD', 'AWS / Vercel', 'Monitoring', 'Git'],
  },
]

const codeStream = [
  'const neural = new Forge({ intent: "create" });',
  'await neural.synthesize({ data, model: "gpt-4" });',
  'export const deploy = async (target: Cloud) => {',
  '  return pipeline.optimize().scale().monitor();',
  '}',
  'interface Intelligence {',
  '  perception: Vector<Semantic>;',
  '  reasoning: ChainOfThought;',
  '  action: ToolUse[];',
  '}',
]

export default function TechMatrix() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const codeRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = canvas.width = canvas.offsetWidth
    let h = canvas.height = canvas.offsetHeight
    let streams: Array<{ x: number; y: number; speed: number; chars: string; length: number }> = []

    function createStream() {
      const chars = '01<>{}[]/\\|=+-*;:'
      let str = ''
      const len = Math.floor(Math.random() * 12) + 6
      for (let i = 0; i < len; i++) str += chars[Math.floor(Math.random() * chars.length)]
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        speed: Math.random() * 0.4 + 0.1,
        chars: str,
        length: len,
      }
    }

    for (let i = 0; i < 30; i++) streams.push(createStream())

    let raf: number
    function animate() {
      ctx!.clearRect(0, 0, w, h)
      streams.forEach((s) => {
        s.x += s.speed
        if (s.x > w + 100) { s.x = -100; s.y = Math.random() * h }
        ctx!.font = '11px "Courier Prime", monospace'
        ctx!.fillStyle = `rgba(88, 166, 255, ${0.06 + Math.sin(Date.now() * 0.001 + s.y) * 0.03})`
        ctx!.fillText(s.chars, s.x, s.y)
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
      gsap.fromTo('.tech-card', { y: 80, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%', toggleActions: 'play none none none' },
      })
      gsap.to('.code-line', {
        x: -300, ease: 'none',
        scrollTrigger: { trigger: codeRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="tech" className="relative py-32 md:py-40 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, hsl(220 13% 5%) 0%, hsl(220 16% 7%) 50%, hsl(220 13% 5%) 100%)' }} />
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(var(--forge-cyan)) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 80% 20%, hsl(210 100% 67% / 0.06) 0%, transparent 50%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <span className="font-mono text-xs tracking-[0.3em] text-[hsl(var(--forge-cyan))] uppercase">
            {t('核心能力矩阵', 'Core Capability Matrix')}
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-medium mt-4 text-[hsl(var(--forge-mist))]">
            {t('技术栈', 'Tech')}
            <span className="forge-text-gold ml-3">Stack</span>
          </h2>
          <p className="mt-4 text-[hsl(var(--forge-cool))] max-w-xl leading-relaxed">
            {t('从底层架构到前端交互，从模型训练到产品落地，构建端到端的 AI 全栈解决方案。', 'End-to-end AI full-stack solutions from architecture to product delivery.')}
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {techGroups.map((group) => (
            <div key={group.title} className="tech-card forge-card p-8 group">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 flex items-center justify-center border border-[hsl(var(--border))] group-hover:border-[hsl(var(--forge-cyan)/0.5)] transition-colors">
                  <group.icon size={20} className="text-[hsl(var(--forge-cyan))]" />
                </div>
                <h3 className="font-mono text-sm tracking-wider text-[hsl(var(--forge-mist))]">{group.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="forge-tag">{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div ref={codeRef} className="mt-24 overflow-hidden py-8">
          <div className="space-y-3">
            {codeStream.map((line, i) => (
              <div key={i} className="code-line whitespace-nowrap font-mono text-lg md:text-2xl lg:text-3xl text-[hsl(var(--forge-cool))] opacity-20 hover:opacity-60 transition-opacity" style={{ marginLeft: `${i * 60}px` }}>
                <span className="text-[hsl(var(--forge-cyan))] mr-4">{'>'}</span>
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
