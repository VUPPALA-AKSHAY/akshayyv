'use client'

import { useMemo, useState } from 'react'
import { BlossomColorPicker, hexToHsl, lightnessToSliderValue, type BlossomColorPickerColor, type BlossomColorPickerValue } from '@dayflow/blossom-color-picker-react'
import { RotateCcw } from 'lucide-react'
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

export default function ThemeBlossom() {
  const { brand, setBrand } = useAccent()
  const [picked, setPicked] = useState<BlossomColorPickerColor | null>(null)

  // Controlled value so the flower core always mirrors the live site theme
  // (picks, migrations and Reset all stay in sync — nothing goes stale).
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

  return (
    <div className="rounded-[10px] border border-black/10 dark:border-white/5 bg-white dark:bg-white/10 p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-6 sm:gap-8">
      <div className="flex-1 text-center sm:text-left min-w-0">
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">Make it yours</p>
        <h2 className="font-[family-name:var(--font-instrument-serif)] italic text-xl sm:text-2xl text-black dark:text-white mb-2">
          Paint my portfolio
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed mb-4">
          Tap the blossom and pick any of the 42 colors — the whole page, background included, re-themes instantly.
        </p>
        <div className="flex items-center justify-center sm:justify-start gap-2.5">
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
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 text-black/70 dark:text-white/70 hover:border-[var(--brand)] hover:text-[var(--brand)] active:scale-95 transition-all touch-manipulation"
          >
            <RotateCcw className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-rotate-180" />
            Reset
          </button>
        </div>
      </div>
      <div className="shrink-0 flex items-center justify-center p-6 sm:p-8">
        <BlossomColorPicker
          value={value}
          colors={PALETTE_42}
          onChange={handleChange}
          onCollapse={handleChange}
          coreSize={64}
          petalSize={40}
          animationDuration={350}
        />
      </div>
    </div>
  )
}
