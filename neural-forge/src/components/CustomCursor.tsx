import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const crossRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const rippleRef = useRef<HTMLDivElement>(null)
  const trailRefs = useRef<(HTMLDivElement | null)[]>([])
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }

    const ring = ringRef.current
    const cross = crossRef.current
    const dot = dotRef.current
    if (!ring || !cross || !dot) return

    const onMove = (e: MouseEvent) => {
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.12, ease: 'power2.out' })
      gsap.to(cross, { x: e.clientX, y: e.clientY, duration: 0.06, ease: 'power2.out' })
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.01, ease: 'none' })

      trailRefs.current.forEach((trail, i) => {
        if (trail) {
          gsap.to(trail, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.08 + i * 0.03,
            ease: 'power2.out',
          })
        }
      })
    }

    const onDown = (e: MouseEvent) => {
      gsap.to(ring, { scale: 0.7, duration: 0.12, ease: 'power2.out' })
      gsap.to(cross, { scale: 0.7, duration: 0.1, ease: 'power2.out' })
      gsap.to(dot, { scale: 0.5, duration: 0.08 })

      if (rippleRef.current) {
        const ripple = rippleRef.current
        gsap.set(ripple, { x: e.clientX, y: e.clientY, scale: 0, opacity: 0.6 })
        gsap.to(ripple, {
          scale: 3,
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
        })
      }
    }

    const onUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.25, ease: 'elastic.out(1, 0.4)' })
      gsap.to(cross, { scale: 1, duration: 0.2, ease: 'elastic.out(1, 0.4)' })
      gsap.to(dot, { scale: 1, duration: 0.15 })
    }

    const onEnter = () => {
      gsap.to(ring, { scale: 1.6, duration: 0.2, ease: 'power2.out' })
      gsap.to(cross, { scale: 1.4, duration: 0.15, ease: 'power2.out' })
      gsap.to(dot, { scale: 1.3, duration: 0.15 })
      gsap.to('.cursor-cross-line', { backgroundColor: 'hsl(32 32% 57%)', duration: 0.2 })
      gsap.to('.cursor-ring-svg', { stroke: 'hsl(32 32% 57%)', duration: 0.2 })
    }

    const onLeave = () => {
      gsap.to(ring, { scale: 1, duration: 0.2, ease: 'power2.out' })
      gsap.to(cross, { scale: 1, duration: 0.15, ease: 'power2.out' })
      gsap.to(dot, { scale: 1, duration: 0.15 })
      gsap.to('.cursor-cross-line', { backgroundColor: 'hsl(210 100% 67%)', duration: 0.2 })
      gsap.to('.cursor-ring-svg', { stroke: 'hsl(32 32% 57%)', duration: 0.2 })
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    const interactives = document.querySelectorAll('a, button, input, textarea, [data-cursor-hover]')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  if (isTouch) return null

  return (
    <>
      {/* Trail dots */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          ref={(el) => { trailRefs.current[i] = el }}
          className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
          style={{ willChange: 'transform' }}
        >
          <div
            className="rounded-full bg-[hsl(var(--forge-cyan))]"
            style={{
              width: `${6 - i * 1.5}px`,
              height: `${6 - i * 1.5}px`,
              opacity: 0.15 - i * 0.04,
            }}
          />
        </div>
      ))}

      {/* Rotating ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36" className="cursor-ring-svg" style={{ animation: 'spin 4s linear infinite' }}>
          <circle
            cx="18"
            cy="18"
            r="15"
            fill="none"
            stroke="hsl(32 32% 57%)"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.8"
          />
        </svg>
      </div>

      {/* Crosshair */}
      <div
        ref={crossRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      >
        <div className="relative w-6 h-6">
          <div className="cursor-cross-line absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-[6px] bg-[hsl(var(--forge-cyan))]" />
          <div className="cursor-cross-line absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-[6px] bg-[hsl(var(--forge-cyan))]" />
          <div className="cursor-cross-line absolute left-0 top-1/2 -translate-y-1/2 h-[1px] w-[6px] bg-[hsl(var(--forge-cyan))]" />
          <div className="cursor-cross-line absolute right-0 top-1/2 -translate-y-1/2 h-[1px] w-[6px] bg-[hsl(var(--forge-cyan))]" />
        </div>
      </div>

      {/* Center dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      >
        <div className="w-[3px] h-[3px] rounded-full bg-[hsl(var(--forge-mist))]" />
      </div>

      {/* Click ripple */}
      <div
        ref={rippleRef}
        className="fixed top-0 left-0 pointer-events-none z-[9997] -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: 'transform' }}
      >
        <div className="w-6 h-6 rounded-full border border-[hsl(var(--forge-cyan))]" />
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}
