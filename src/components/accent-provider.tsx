'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { useTheme } from 'next-themes'

export const DEFAULT_BRAND = '#27272a'
const STORAGE_KEY = 'akshay-brand-v4'

function normalizeHex(hex: string): string | null {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  return /^[0-9a-fA-F]{6}$/.test(full) ? `#${full}` : null
}

/** Readable text color (near-black / white) for a given background hex. */
function contrastOn(hex: string): string {
  const full = hex.replace('#', '')
  const lin = (v: number) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  }
  const r = lin(parseInt(full.slice(0, 2), 16))
  const g = lin(parseInt(full.slice(2, 4), 16))
  const b = lin(parseInt(full.slice(4, 6), 16))
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.45 ? '#101014' : '#ffffff'
}

function hexToHsl(hex: string): { h: number; s: number } {
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
  return { h: Math.round(h), s: Math.round(s * 100) }
}

/** Full-page theme derived from the picked color + light/dark mode. */
function themeVars(hex: string, mode: 'light' | 'dark'): { pageBg: string; ink: string } {
  const { h, s } = hexToHsl(hex)
  if (mode === 'dark') {
    return {
      pageBg: `hsl(${h} ${s}% 7%)`,
      ink: `hsl(${h} ${s}% 80%)`,
    }
  }
  return {
    pageBg: `hsl(${h} ${s}% 96%)`,
    ink: `hsl(${h} ${s}% 30%)`,
  }
}

const AccentCtx = createContext<{ brand: string; setBrand: (hex: string) => void }>({
  brand: DEFAULT_BRAND,
  setBrand: () => {},
})

export function AccentProvider({ children }: { children: ReactNode }) {
  const [brand, setBrandState] = useState(DEFAULT_BRAND)
  const { resolvedTheme } = useTheme()
  const mode = resolvedTheme === 'dark' ? 'dark' : 'light'

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      const valid = saved ? normalizeHex(saved) : null
      if (valid) setBrandState(valid)
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const { pageBg, ink } = themeVars(brand, mode)
    root.style.setProperty('--brand', brand)
    root.style.setProperty('--on-brand', contrastOn(brand))
    root.style.setProperty('--page-bg', pageBg)
    root.style.setProperty('--brand-ink', ink)
    try {
      localStorage.setItem(STORAGE_KEY, brand)
    } catch {
      /* ignore */
    }
  }, [brand, mode])

  const setBrand = (hex: string) => {
    const valid = normalizeHex(hex)
    if (valid) setBrandState(valid)
  }

  return <AccentCtx.Provider value={{ brand, setBrand }}>{children}</AccentCtx.Provider>
}

export const useAccent = () => useContext(AccentCtx)
