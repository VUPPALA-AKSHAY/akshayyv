'use client'

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

export default function AboutMe() {
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
                            src="/images/about-me.jpg"
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
                <div className="flex flex-wrap gap-2.5 sm:gap-3">
                    {skills.map((skill) => (
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
                            <span className="whitespace-nowrap shrink-0 pr-3 text-[11px] font-medium text-black/80 dark:text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                {skill.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
