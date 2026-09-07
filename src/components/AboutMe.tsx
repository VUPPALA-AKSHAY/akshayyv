'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

const SVG = 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons'

// Every icon-backed skill from the resume: dev + languages + AI + cloud + tools
const skills = [
    { name: 'JavaScript', icon: `${SVG}/javascript/default.svg` },
    { name: 'TypeScript', icon: `${SVG}/typescript/default.svg` },
    { name: 'React', icon: `${SVG}/react/default.svg` },
    { name: 'Next.js', icon: `${SVG}/nextjs/default.svg` },
    { name: 'Node.js', icon: `${SVG}/nodejs/default.svg` },
    { name: 'Express.js', icon: `${SVG}/express/default.svg` },
    { name: 'Tailwind CSS', icon: `${SVG}/tailwind-css/default.svg` },
    { name: 'Python', icon: `${SVG}/python/default.svg` },
    { name: 'MySQL', icon: `${SVG}/mysql/default.svg` },
    { name: 'PostgreSQL', icon: `${SVG}/postgresql/default.svg` },
    { name: 'Supabase', icon: `${SVG}/supabase/default.svg` },
    { name: 'LangChain', icon: `${SVG}/langchain/default.svg` },
    { name: 'LangGraph', icon: `${SVG}/langgraph/default.svg` },
    { name: 'LlamaIndex', icon: `${SVG}/llamaindex/default.svg` },
    { name: 'Pinecone', icon: `${SVG}/pinecone/default.svg` },
    { name: 'Qdrant', icon: `${SVG}/qdrant/default.svg` },
    { name: 'Gemini', icon: `${SVG}/gemini/default.svg` },
    { name: 'Groq', icon: `${SVG}/groq/default.svg` },
    { name: 'Claude', icon: `${SVG}/claude/default.svg` },
    { name: 'Mistral', icon: `${SVG}/mistral/default.svg` },
    { name: 'OpenAI', icon: `${SVG}/openai/default.svg` },
    { name: 'DeepSeek', icon: `${SVG}/deepseek/default.svg` },
    { name: 'CrewAI', icon: `${SVG}/crewai/default.svg` },
    { name: 'Keras', icon: `${SVG}/keras/default.svg` },
    { name: 'TensorFlow', icon: `${SVG}/tensorflow/default.svg` },
    { name: 'PyTorch', icon: `${SVG}/pytorch/default.svg` },
    { name: 'MCP', icon: `${SVG}/model-context-protocol/default.svg` },
    { name: 'OpenClaw', icon: `${SVG}/openclaw/default.svg` },
    { name: 'Hermes', icon: `${SVG}/nousresearch-hermes/default.svg` },
    { name: 'n8n', icon: `${SVG}/n8n/default.svg` },
    { name: 'Google Cloud', icon: `${SVG}/google-cloud/default.svg` },
    { name: 'Docker', icon: `${SVG}/docker/default.svg` },
    { name: 'Git', icon: `${SVG}/git/default.svg` },
    { name: 'GitHub', icon: `${SVG}/github/default.svg` },
    { name: 'VS Code', icon: `${SVG}/visual-studio-code/default.svg` },
    { name: 'Postman', icon: `${SVG}/postman/default.svg` },
    { name: 'Jupyter', icon: `${SVG}/jupyter/default.svg` },
    { name: 'Colab', icon: `${SVG}/google-colab/default.svg` },
    { name: 'Excel', icon: `${SVG}/microsoft-excel/default.svg` },
]

// In-flow tiles grow to the right on hover. A wrapping row has no free space,
// so a growing last tile would jump down a line (the flicker). Fix without any
// overlay: lay tiles out in fixed non-wrapping rows that each end ~152px early
// on desktop. Hover growth (max 160px tile - 32px icon = 128px) fills that
// reserved gutter instead of re-wrapping, and rows below never move.
const ROW_RESERVE = 152
const TILE = 32
const GAP = 12
const GAP_MOBILE = 10

export default function AboutMe() {
    const gridRef = useRef<HTMLDivElement>(null)
    const [perRow, setPerRow] = useState(0)

    useEffect(() => {
        const el = gridRef.current
        if (!el) return
        const compute = () => {
            const sm = window.matchMedia('(min-width: 640px)').matches
            const gap = sm ? GAP : GAP_MOBILE
            const avail = el.clientWidth - (sm ? ROW_RESERVE : 0)
            setPerRow(Math.max(2, Math.floor((avail + gap) / (TILE + gap))))
        }
        compute()
        let t: ReturnType<typeof setTimeout> | undefined
        const onResize = () => {
            clearTimeout(t)
            t = setTimeout(compute, 120)
        }
        window.addEventListener('resize', onResize)
        return () => window.removeEventListener('resize', onResize)
    }, [])

    const rows: typeof skills[] = []
    if (perRow > 0) {
        for (let i = 0; i < skills.length; i += perRow) {
            rows.push(skills.slice(i, i + perRow))
        }
    }

    const renderTile = (skill: (typeof skills)[number]) => (
        <div key={skill.name} className="skill-tile group">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                <Image
                    src={skill.icon}
                    alt={skill.name}
                    width={16}
                    height={16}
                    className="w-4 h-4"
                    unoptimized
                />
            </div>
            <span className="whitespace-nowrap shrink-0 pr-3 text-[11px] font-medium text-black/80 dark:text-white/80 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
                {skill.name}
            </span>
        </div>
    )

    return (
        <div className="w-full">
            {/* Section Header */}
            <div className="mb-4">
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-1">About</p>
                <h2 className="text-xl font-bold text-[var(--brand-ink)] transition-colors duration-500">Me</h2>
            </div>

            {/* Content Card */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                {/* Profile Image */}
                <div className="shrink-0">
                    <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-2xl overflow-hidden shadow-lg">
                        <Image
                            src="/images/new-avatar.png"
                            alt="Vuppala Akshay"
                            width={192}
                            height={192}
                            className="w-full h-full object-cover"
                            priority
                        />
                    </div>
                </div>

                {/* Info Section */}
                <div className="flex-1">
                    {/* Name */}
                    <h3 className="text-2xl sm:text-3xl font-[family-name:var(--font-instrument-serif)] text-black dark:text-white mb-4">
                        Vuppala Akshay
                    </h3>

                    {/* Bio */}
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base leading-relaxed mb-6">
                        I&apos;m an aspiring AI and Frontend Developer from Hyderabad, pursuing BCA at KL University (CGPA 8.55). I build full-stack web apps and AI experiences — RAG chatbots, autonomous agents, and clean React interfaces. Infosys Springboard intern, hackathon finalist, and always shipping.
                    </p>

                </div>
            </div>

            {/* Skills — full width below */}
            <div className="mt-6 sm:mt-8">
                <h4 className="font-[family-name:var(--font-instrument-serif)] text-xl sm:text-2xl text-black dark:text-white mb-4">Skills</h4>
                <div ref={gridRef} className="overflow-visible sm:pr-[152px]">
                    {perRow > 0 ? (
                        rows.map((row, ri) => (
                            <div key={ri} className="flex flex-nowrap gap-2.5 sm:gap-3 overflow-visible mb-2.5 sm:mb-3 last:mb-0">
                                {row.map(renderTile)}
                            </div>
                        ))
                    ) : (
                        <div className="flex flex-wrap gap-2.5 sm:gap-3">
                            {skills.map(renderTile)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
