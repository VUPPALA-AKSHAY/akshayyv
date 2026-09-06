'use client'

import Image from 'next/image'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

const SVG = 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons'

const skills = [
    { name: 'React', icon: `${SVG}/react/default.svg` },
    { name: 'Next.js', icon: `${SVG}/nextjs/default.svg` },
    { name: 'JavaScript', icon: `${SVG}/javascript/default.svg` },
    { name: 'TypeScript', icon: `${SVG}/typescript/default.svg` },
    { name: 'Node.js', icon: `${SVG}/nodejs/default.svg` },
    { name: 'Tailwind CSS', icon: `${SVG}/tailwind-css/default.svg` },
    { name: 'Python', icon: `${SVG}/python/default.svg` },
    { name: 'MySQL', icon: `${SVG}/mysql/default.svg` },
    { name: 'PostgreSQL', icon: `${SVG}/postgresql/default.svg` },
    { name: 'Supabase', icon: `${SVG}/supabase/default.svg` },
    { name: 'Docker', icon: `${SVG}/docker/default.svg` },
    { name: 'Google Cloud', icon: `${SVG}/google-cloud/default.svg` },
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

                    {/* Skills */}
                    <div>
                        <h4 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-3">Skills</h4>
                        <div className="flex flex-wrap gap-3">
                            {skills.map((skill) => (
                                <Tooltip key={skill.name}>
                                    <TooltipTrigger asChild>
                                        <div className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer">
                                            <Image
                                                src={skill.icon}
                                                alt={skill.name}
                                                width={28}
                                                height={28}
                                                className="w-6 h-6 sm:w-7 sm:h-7"
                                                unoptimized
                                            />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        {skill.name}
                                    </TooltipContent>
                                </Tooltip>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
