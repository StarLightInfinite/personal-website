import { useEffect, useState } from 'react'
import gsap from 'gsap'

interface LoaderProps {
  onComplete: () => void
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          return 100
        }
        return p + Math.random() * 15 + 5
      })
    }, 80)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      const tl = gsap.timeline()
      tl.to('.loader-bar', { scaleX: 1, duration: 0.3, ease: 'power2.in' })
        .to('.loader-text', { opacity: 0, y: -20, duration: 0.4 }, '-=0.1')
        .to('.loader-overlay', {
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
          onComplete,
        })
    }
  }, [progress, onComplete])

  const clamped = Math.min(progress, 100)

  return (
    <div className="loader-overlay fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[hsl(var(--forge-deep))]">
      <div className="relative mb-8">
        <div className="font-mono text-xs tracking-[0.3em] text-[hsl(var(--forge-cool))] uppercase mb-4 text-center">
          Neural Forge / 星核造物
        </div>
        <div className="font-display text-4xl md:text-6xl font-medium tracking-tight">
          <span className="forge-text-gold">SYSTEM</span>
          <span className="text-[hsl(var(--forge-mist))] ml-3">BOOT</span>
        </div>
      </div>

      <div className="w-64 h-[2px] bg-[hsl(var(--border))] relative overflow-hidden">
        <div
          className="loader-bar absolute inset-y-0 left-0 bg-[hsl(var(--forge-cyan))]"
          style={{ width: `${clamped}%`, transition: 'width 0.1s linear' }}
        />
      </div>

      <div className="loader-text mt-4 font-mono text-sm text-[hsl(var(--forge-cool))]">
        <span className="text-[hsl(var(--forge-cyan))]">{clamped.toFixed(0)}%</span>
        <span className="mx-2">|</span>
        <span>INITIALIZING MODULES...</span>
      </div>

      <div className="absolute bottom-8 left-8 font-mono text-[10px] text-[hsl(var(--forge-cool))] opacity-40">
        <div>CPU: OK</div>
        <div>MEM: 4096MB OK</div>
        <div>GPU: ACCELERATED</div>
      </div>
    </div>
  )
}
