'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import rawSource from './generative-tree-source'

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function buildDocument(source: string, size: number, particleAmount: number) {
  const particleCount = Math.max(0, Math.round(50 * clamp(particleAmount, 0, 2)))
  const pad = 1 / clamp(size, 0.65, 1.5)

  return source
    .replace(/<script[^>]+cloudflareinsights\.com[^>]*><\/script>/gi, '')
    .replace(
      '</head>',
      `<style data-generative-tree-focus>
html, body, canvas { width: 100%; height: 100%; margin: 0; overflow: hidden; background: rgba(0,0,0,0) !important; }
.label { display: none !important; }
</style><script data-generative-tree-controls>
(function () {
  var nativeFrame = window.requestAnimationFrame.bind(window);
  var clock = { last: null, time: null };
  window.__GENERATIVE_TREE_CONTROLS = { speed: 1, paused: false, backgroundColor: '#0a0a0a' };
  window.requestAnimationFrame = function (callback) {
    return nativeFrame(function (realTime) {
      var state = window.__GENERATIVE_TREE_CONTROLS;
      if (clock.last === null) {
        clock.last = realTime;
        clock.time = realTime;
      } else {
        if (!state.paused) clock.time += (realTime - clock.last) * state.speed;
        clock.last = realTime;
      }
      callback(clock.time);
    });
  };
  window.addEventListener('message', function (event) {
    if (!event.data || event.data.type !== 'generative-tree-controls') return;
    var next = event.data.controls || {};
    if (Number.isFinite(next.speed)) {
      window.__GENERATIVE_TREE_CONTROLS.speed = Math.max(0, Math.min(3, next.speed));
    }
    window.__GENERATIVE_TREE_CONTROLS.paused = Boolean(next.paused);
    if (typeof next.backgroundColor === 'string') {
      window.__GENERATIVE_TREE_CONTROLS.backgroundColor = next.backgroundColor;
    }
  });
})();
<\/script></head>`
    )
    .replace('const PARTICLE_COUNT = 50;', `const PARTICLE_COUNT = ${particleCount};`)
    .replace(
      "const _pad = parseFloat(new URLSearchParams(location.search).get('p')) || 1;",
      `const _pad = ${pad.toFixed(4)};`
    )
    .replace(
      `function frame(time) {\n    // Decay shake`,
      `function frame(time) {\n    if (window.__GENERATIVE_TREE_CONTROLS.paused) { requestAnimationFrame(frame); return; }\n\n    // Decay shake`
    )
    .replace(
      'b.growthProgress = Math.min(1, b.growthProgress + b.growthSpeed);',
      'b.growthProgress = Math.min(1, b.growthProgress + b.growthSpeed * window.__GENERATIVE_TREE_CONTROLS.speed);'
    )
    .replace('holdTimer++;', 'holdTimer += window.__GENERATIVE_TREE_CONTROLS.speed;')
    .replace('fadeTimer++;', 'fadeTimer += window.__GENERATIVE_TREE_CONTROLS.speed;')
    .replace('waitTimer++;', 'waitTimer += window.__GENERATIVE_TREE_CONTROLS.speed;')
    .replace(
      `  createTree();\n  requestAnimationFrame(frame);`,
      `  function startTreeWhenSized() {\n    resize();\n    if (W <= 0 || H <= 0) { requestAnimationFrame(startTreeWhenSized); return; }\n    createTree();\n    requestAnimationFrame(frame);\n  }\n  requestAnimationFrame(startTreeWhenSized);`
    )
    .replace(
      `    // Vignette\n    const vigGrad = ctx.createRadialGradient(W / 2, H / 2, W * 0.3, W / 2, H / 2, W * 0.78);\n    vigGrad.addColorStop(0, 'rgba(10, 10, 10, 0)');\n    vigGrad.addColorStop(1, 'rgba(4, 4, 4, 0.3)');\n    ctx.fillStyle = vigGrad;\n    ctx.fillRect(0, 0, W, H);`,
      ``
    )
}

export default function TransparentGenerativeTree({
  speed = 1,
  size = 1,
  particleAmount = 1,
  opacity = 1,
  hue = 0,
  saturation = 1,
  brightness = 1,
  backgroundColor = '#0a0a0a',
  className = '',
  style,
}: {
  speed?: number
  size?: number
  particleAmount?: number
  opacity?: number
  hue?: number
  saturation?: number
  brightness?: number
  backgroundColor?: string
  className?: string
  style?: React.CSSProperties
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [visible, setVisible] = useState(true)
  const [docVisible, setDocVisible] = useState(true)
  const safeSpeed = clamp(speed, 0, 3)
  const paused = !visible || !docVisible || safeSpeed === 0

  const srcDoc = useMemo(() => buildDocument(rawSource, size, particleAmount), [size, particleAmount])

  const postControls = useCallback(() => {
    iframeRef.current?.contentWindow?.postMessage(
      { type: 'generative-tree-controls', controls: { speed: safeSpeed, paused, backgroundColor } },
      '*'
    )
  }, [paused, safeSpeed])

  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(([entry]) => setVisible(entry?.isIntersecting ?? true))
    observer.observe(iframe)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const update = () => setDocVisible(!document.hidden)
    document.addEventListener('visibilitychange', update)
    return () => document.removeEventListener('visibilitychange', update)
  }, [])

  useEffect(() => { postControls() }, [postControls, srcDoc])

  useEffect(() => {
    if (!iframeRef.current?.contentWindow) return
    iframeRef.current.contentWindow.postMessage(
      { type: 'generative-tree-controls', controls: { backgroundColor } },
      '*'
    )
  }, [backgroundColor])

  return (
    <div
      className={`threeui-background generative-tree${className ? ` ${className}` : ''}`}
      style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', background: backgroundColor, pointerEvents: 'auto', ...style }}
    >
      <iframe
        ref={iframeRef}
        title="Generative Tree background"
        srcDoc={srcDoc}
        sandbox="allow-scripts"
        onLoad={postControls}
        aria-hidden="true"
        tabIndex={-1}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'block',
          width: '100%',
          height: '100%',
          border: 0,
          background: 'transparent',
          opacity: clamp(opacity, 0.05, 1),
          filter: `hue-rotate(${clamp(hue, -180, 180)}deg) saturate(${clamp(saturation, 0, 2)}) brightness(${clamp(brightness, 0.35, 1.8)})`,
        }}
      />
    </div>
  )
}
