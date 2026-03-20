'use client'

import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { observe } from '@/lib/shared-observer'

export function ScrollReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    return observe(
      el,
      (entry) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { rootMargin: '-80px' }
    )
  }, [])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
