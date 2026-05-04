import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/hooks/useLanguage'
import { Building2, ChevronRight, Award, TrendingUp } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const companies = [
  {
    name: '广州龙锐科技有限公司',
    enName: 'Guangzhou Longrui Technology',
    period: '2025.04 — 至今',
    position: '技术专家 / Tech Expert',
    highlight: 'AIGC 工具平台 · 架构优化',
    projects: [
      { name: '聚合 AIGC 工具平台', desc: '整合文生图、AI口播、视频创作的企业级工具中台，提升团队人效30%', tags: ['RAG', 'AIGC', 'Vue'] },
      { name: '服务器架构优化 & 全局监控', desc: '资源使用率提升40%，成本降低20%，BUG数量减少70%', tags: ['性能调优', '监控体系', '微服务'] },
    ],
    achievements: ['团队人效提升 30%', '服务器成本降低 20%', 'BUG数量减少 70%']
  },
  {
    name: '广州天纵信息技术有限公司',
    enName: 'Guangzhou Tianzong Technology',
    period: '2025.01 — 2025.03',
    position: '技术专家 / Tech Expert',
    highlight: '投放平台 · 数据分析',
    projects: [
      { name: '广告投放管理平台', desc: '解决买量数据延迟问题，access_token调度优化，彻底解决系统爆炸问题', tags: ['Node.js', 'Redis', '定时任务'] },
      { name: '买量数据实时分析系统', desc: '多渠道数据整合，实时归因分析，支持投放决策', tags: ['数据中台', '实时计算', 'BI'] },
    ],
    achievements: ['解决 P0/P1 级故障', '数据延迟问题根治']
  },
  {
    name: '广州天蝎互动网络科技有限公司',
    enName: 'Guangzhou Scorpio Interactive',
    period: '2019.08 — 2024.12',
    position: '技术经理 / Tech Manager',
    highlight: '技术团队管理 · 全业务支撑',
    projects: [
      { name: '综合数据中台', desc: '数十亿级数据处理，打通研发、发行、运营、客服全链路数据', tags: ['微服务', '大数据', '数据治理'] },
      { name: '多渠道发行 SDK 平台', desc: '覆盖 Android、iOS、H5，集成头条、广点通、微信小游戏等平台', tags: ['SDK', 'Unity', '热更新'] },
      { name: '企业 AI 客服系统', desc: '基于 RAG 技术，24小时值班，结合数据埋点自动更新知识库', tags: ['RAG', 'NLP', 'PaddleAI'] },
      { name: 'AI 玩家行为预测系统', desc: 'LTV 预测、购买力预测、流失预测，助力精细化运营', tags: ['PyTorch', '机器学习', '用户画像'] },
    ],
    achievements: ['核心业务 3 年零故障', '助力公司月流水达 5000万', '自研项目获「中国制造2025」奖', '团队规模 10+ 人']
  },
  {
    name: '广州乐牛软件科技有限公司',
    enName: 'Guangzhou Leniu Software',
    period: '2016.06 — 2019.08',
    position: 'PHP 组长 / PHP Team Lead',
    highlight: '游戏后台 · 广告发行',
    projects: [
      { name: '游戏研发管理后台', desc: '多款游戏后端管理系统，支持高并发玩家数据处理', tags: ['PHP', 'MySQL', 'Redis'] },
      { name: '游戏运营数据分析平台', desc: '实时玩家行为分析，留存、付费、活跃数据可视化', tags: ['数据可视化', '报表系统', 'ETL'] },
      { name: '广告发行管理系统', desc: '对接多个广告渠道，支持投放效果追踪与优化', tags: ['渠道对接', 'API 聚合', '效果追踪'] },
    ],
    achievements: ['助力公司流水从 3000万 到 8000万', '连续 3 年优秀员工']
  },
]

export default function CompanyExperience() {
  const { t } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.company-card', { y: 60, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: '.company-wrap', start: 'top 75%' },
      })
      gsap.fromTo('.project-item', { x: 30, opacity: 0 }, {
        x: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: '.company-wrap', start: 'top 70%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="experience" className="relative py-32 md:py-40 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, hsl(220 16% 9%) 0%, hsl(220 13% 6%) 50%, hsl(220 16% 9%) 100%)' }} />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(90deg, transparent 49%, hsl(var(--forge-gold)) 49%, hsl(var(--forge-gold)) 51%, transparent 51%)', backgroundSize: '120px 100%' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 company-wrap">
        <div className="text-center mb-16">
          <span className="font-mono text-xs tracking-[0.3em] text-[hsl(var(--forge-cyan))] uppercase">
            {t('职业经历', 'Career Experience')}
          </span>
          <h2 className="font-display text-4xl md:text-6xl font-medium mt-4 text-[hsl(var(--forge-mist))]">
            {t('企业', 'Enterprise')}
            <span className="forge-text-gold ml-3">{t('实战', 'Projects')}</span>
          </h2>
          <p className="mt-4 text-[hsl(var(--forge-cool))] max-w-2xl mx-auto">
            {t('11年深耕技术，跨越多家知名企业，从技术骨干到团队管理者', '11 years of technical depth across leading enterprises, from engineer to manager')}
          </p>
        </div>

        <div className="space-y-8">
          {companies.map((company, i) => (
            <div key={i} className="company-card relative">
              <div className="absolute left-0 top-8 bottom-0 w-[1px] bg-[hsl(var(--border))]" style={{ display: i === companies.length - 1 ? 'none' : 'block' }} />
              
              <div className="relative pl-8">
                <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[7px] rounded-full bg-[hsl(var(--forge-gold))] ring-4 ring-[hsl(var(--forge-deep))] z-10" />
                
                <div className="bg-[hsl(var(--forge-surface))] rounded-xl p-6 md:p-8 border border-[hsl(var(--border))] hover:border-[hsl(var(--forge-cyan)/0.3)] transition-colors">
                  {/* 公司头部信息 */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                    <div>
                      <div className="flex items-center gap-3">
                        <Building2 size={20} className="text-[hsl(var(--forge-cyan))]" />
                        <h3 className="font-display text-xl md:text-2xl font-medium text-[hsl(var(--forge-mist))]">
                          {company.name}
                        </h3>
                      </div>
                      <p className="font-mono text-xs text-[hsl(var(--forge-cool))] mt-1 opacity-70">
                        {company.enName}
                      </p>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="font-mono text-sm text-[hsl(var(--forge-cyan))]">{company.period}</p>
                      <p className="font-mono text-sm text-[hsl(var(--forge-gold))] mt-1">{company.position}</p>
                    </div>
                  </div>

                  {/* 核心亮点 */}
                  <div className="mb-6">
                    <p className="text-sm text-[hsl(var(--forge-cool))] opacity-80">
                      <span className="text-[hsl(var(--forge-teal))]">◈ </span>
                      {company.highlight}
                    </p>
                  </div>

                  {/* 项目列表 */}
                  <div className="space-y-4 mb-6">
                    <p className="font-mono text-xs tracking-wider text-[hsl(var(--forge-cool))] opacity-60 uppercase mb-3">
                      {t('核心项目 / Key Projects', 'Key Projects')}
                    </p>
                    {company.projects.map((project, j) => (
                      <div key={j} className="project-item relative pl-4 py-3 border-l-2 border-[hsl(var(--forge-cyan)/0.2)] bg-[hsl(var(--forge-deep))] rounded-r-lg">
                        <div className="flex items-start gap-2">
                          <ChevronRight size={14} className="text-[hsl(var(--forge-cyan))] mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-[hsl(var(--forge-mist))] text-sm">{project.name}</h4>
                            <p className="text-xs text-[hsl(var(--forge-cool))] mt-1 leading-relaxed">{project.desc}</p>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {project.tags.map((tag, k) => (
                                <span key={k} className="forge-tag text-[10px] px-2 py-0.5">{tag}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 成就标签 */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-[hsl(var(--border))]">
                    <Award size={16} className="text-[hsl(var(--forge-gold))]" />
                    {company.achievements.map((achievement, j) => (
                      <span key={j} className="flex items-center gap-1.5 text-xs text-[hsl(var(--forge-cool))] bg-[hsl(var(--forge-gold)/0.08)] px-3 py-1 rounded-full border border-[hsl(var(--forge-gold)/0.15)]">
                        <TrendingUp size={12} className="text-[hsl(var(--forge-gold))]" />
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
