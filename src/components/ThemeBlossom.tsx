'use client'

import { useMemo, useRef, useState, useLayoutEffect } from 'react'
import { BlossomColorPicker, hexToHsl, lightnessToSliderValue, type BlossomColorPickerColor, type BlossomColorPickerValue } from '@dayflow/blossom-color-picker-react'
import { RotateCcw } from 'lucide-react'
import { useTheme } from 'next-themes'
import TransparentGenerativeTree from './TransparentGenerativeTree'
import { DEFAULT_BRAND, useAccent } from './accent-provider'

const PALETTE_42 = [
  '#ef4444', '#f43f5e', '#e11d48', '#fb7185', '#ec4899', '#db2777',
  '#f97316', '#fb923c', '#f59e0b', '#fbbf24', '#facc15', '#eab308',
  '#22c55e', '#4ade80', '#16a34a', '#84cc16', '#a3e635', '#10b981',
  '#14b8a6', '#2dd4bf', '#06b6d4', '#22d3ee', '#0ea5e9', '#38bdf8',
  '#3b82f6', '#60a5fa', '#2563eb', '#6366f1', '#818cf8', '#4f46e5',
  '#8b5cf6', '#a78bfa', '#a855f7', '#c084fc', '#d946ef', '#e879f9',
  '#f8fafc', '#cbd5e1', '#94a3b8', '#64748b', '#334155', '#111827',
]

function brandToPageBg(hex: string, mode: string): string {
  const full = hex.replace('#', '')
  const r = parseInt(full.slice(0, 2), 16) / 255
  const g = parseInt(full.slice(2, 4), 16) / 255
  const b = parseInt(full.slice(4, 6), 16) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  let h = 0
  let s = 0
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0)
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    h *= 60
  }
  const lightness = mode === 'dark' ? 7 : 96
  return `hsl(${Math.round(h)} ${Math.round(s * 100)}% ${lightness}%)`
}

export default function ThemeBlossom() {
  const { brand, setBrand } = useAccent()
  const { resolvedTheme } = useTheme()
  const mode = resolvedTheme === 'dark' ? 'dark' : 'light'
  const [picked, setPicked] = useState<BlossomColorPickerColor | null>(null)
  const outerRef = useRef<HTMLDivElement>(null)
  const placeholderRef = useRef<HTMLDivElement>(null)
  const [blossomPos, setBlossomPos] = useState({ top: 0, left: 0 })

  const value: BlossomColorPickerValue = useMemo(() => {
    if (picked && picked.hex.toLowerCase() === brand.toLowerCase()) return picked
    const { h, l } = hexToHsl(brand)
    return { hue: h, saturation: lightnessToSliderValue(l), alpha: 100, layer: 'outer' }
  }, [brand, picked])

  const handleChange = (c: BlossomColorPickerColor) => {
    if (!c?.hex || !/^#[0-9a-fA-F]{6}$/.test(c.hex)) return
    setPicked(c)
    setBrand(c.hex)
  }

  const treeBg = useMemo(() => brandToPageBg(brand, mode), [brand, mode])

  useLayoutEffect(() => {
    function updatePos() {
      if (!outerRef.current || !placeholderRef.current) return
      const outerRect = outerRef.current.getBoundingClientRect()
      const phRect = placeholderRef.current.getBoundingClientRect()
      setBlossomPos({
        top: phRect.top - outerRect.top,
        left: phRect.left - outerRect.left,
      })
    }
    updatePos()
    window.addEventListener('resize', updatePos)
    return () => window.removeEventListener('resize', updatePos)
  }, [])

  return (
    <div ref={outerRef} className="relative select-none">
      <div className="relative rounded-[10px] border border-black/10 dark:border-white/5 p-4 sm:p-6 flex flex-col gap-3 overflow-hidden" style={{ background: 'var(--page-bg)' }}>
        <div className="absolute top-0 right-0 w-40 h-52 z-0 opacity-90 overflow-hidden rounded-[10px]">
          <TransparentGenerativeTree
            speed={1}
            size={1}
            particleAmount={1}
            hue={0}
            saturation={1}
            brightness={1}
            opacity={1}
            backgroundColor={treeBg}
          />
        </div>
        <div className="relative z-10 flex items-center gap-4 pointer-events-none">
          <div className="text-left min-w-0">
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Make it yours</p>
            <h2 className="font-[family-name:var(--font-instrument-serif)] italic text-xl sm:text-2xl text-black dark:text-white mb-1">
              Paint my portfolio
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed mb-2">
              Tap the blossom, for a change 💖
            </p>
          </div>
          <div ref={placeholderRef} className="w-[64px] h-[64px] shrink-0" />
        </div>
        <div className="relative z-10 flex items-center gap-2.5">
          <span
            className="w-5 h-5 rounded-full ring-2 ring-black/10 dark:ring-white/20 shrink-0 transition-colors duration-300"
            style={{ background: 'var(--brand)' }}
          />
          <code className="text-xs sm:text-sm font-mono text-black/70 dark:text-white/70">
            {brand.toUpperCase()}
          </code>
          <button
            onClick={() => setBrand(DEFAULT_BRAND)}
            title="Reset to default dark theme"
            className="group pointer-events-auto inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 text-black/70 dark:text-white/70 hover:border-[var(--brand)] hover:text-[var(--brand)] active:scale-95 transition-all touch-manipulation"
          >
            <RotateCcw className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-rotate-180" />
            Reset
          </button>
        </div>
      </div>
      <div
        className="absolute z-30 pointer-events-auto"
        style={{ top: blossomPos.top, left: blossomPos.left }}
      >
        <BlossomColorPicker
          value={value}
          colors={PALETTE_42}
          onChange={handleChange}
          onCollapse={handleChange}
          coreSize={64}
          petalSize={44}
          animationDuration={350}
        />
      </div>
    </div>
  )
}
