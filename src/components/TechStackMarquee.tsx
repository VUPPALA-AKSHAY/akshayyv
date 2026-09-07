'use client'

import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";


// Tech Stack Data — brand icons via theSVG (https://thesvg.org)
const SVG = 'https://cdn.jsdelivr.net/gh/glincker/thesvg@main/public/icons'
const techStack = [
  // Languages
  { name: "JavaScript", category: "language", icon: `${SVG}/javascript/default.svg`, color: "bg-gray-500" },
  { name: "TypeScript", category: "language", icon: `${SVG}/typescript/default.svg`, color: "bg-gray-500" },
  { name: "Python", category: "language", icon: `${SVG}/python/default.svg`, color: "bg-gray-500" },
  { name: "MySQL", category: "language", icon: `${SVG}/mysql/default.svg`, color: "bg-gray-500" },

  // Frameworks & Libraries
  { name: "React.js", category: "framework", icon: `${SVG}/react/default.svg`, color: "bg-gray-500" },
  { name: "Next.js", category: "framework", icon: `${SVG}/nextjs/default.svg`, color: "bg-gray-500" },
  { name: "Node.js", category: "framework", icon: `${SVG}/nodejs/default.svg`, color: "bg-gray-500" },
  { name: "Express.js", category: "framework", icon: `${SVG}/express/default.svg`, color: "bg-gray-500" },
  { name: "Tailwind CSS", category: "framework", icon: `${SVG}/tailwind-css/default.svg`, color: "bg-gray-500" },

  // AI / Data
  { name: "LangChain", category: "ai", icon: `${SVG}/langchain/default.svg`, color: "bg-gray-500" },
  { name: "LangGraph", category: "ai", icon: `${SVG}/langgraph/default.svg`, color: "bg-gray-500" },
  { name: "LlamaIndex", category: "ai", icon: `${SVG}/llamaindex/default.svg`, color: "bg-gray-500" },
  { name: "Pinecone", category: "ai", icon: `${SVG}/pinecone/default.svg`, color: "bg-gray-500" },
  { name: "Qdrant", category: "ai", icon: `${SVG}/qdrant/default.svg`, color: "bg-gray-500" },
  { name: "Gemini", category: "ai", icon: `${SVG}/gemini/default.svg`, color: "bg-gray-500" },
  { name: "Groq", category: "ai", icon: `${SVG}/groq/default.svg`, color: "bg-gray-500" },
  { name: "PostgreSQL", category: "database", icon: `${SVG}/postgresql/default.svg`, color: "bg-gray-500" },
  { name: "Supabase", category: "database", icon: `${SVG}/supabase/default.svg`, color: "bg-gray-500" },

  // Developer Tools
  { name: "Git", category: "tool", icon: `${SVG}/git/default.svg`, color: "bg-gray-500" },
  { name: "GitHub", category: "tool", icon: `${SVG}/github/default.svg`, color: "bg-gray-500" },
  { name: "Docker", category: "tool", icon: `${SVG}/docker/default.svg`, color: "bg-gray-500" },
  { name: "Google Cloud", category: "tool", icon: `${SVG}/google-cloud/default.svg`, color: "bg-gray-500" },
  { name: "n8n", category: "tool", icon: `${SVG}/n8n/default.svg`, color: "bg-gray-500" },
  { name: "Postman", category: "tool", icon: `${SVG}/postman/default.svg`, color: "bg-gray-500" },
  { name: "Vercel", category: "tool", icon: `${SVG}/vercel/default.svg`, color: "bg-gray-500" },
];

interface TechIconProps {
  tech: typeof techStack[0];
  className?: string;
}

function TechIcon({ tech, className = "" }: TechIconProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-2 sm:p-3 transition-all duration-300 hover:scale-105 min-w-[80px] sm:min-w-[90px] group ${className}`}>
      {/* Icon Container */}
      <div className="relative w-8 h-8 sm:w-10 sm:h-10 mb-1.5 sm:mb-2 flex items-center justify-center">
        {/* Try to load actual SVG, fallback to grey placeholder */}
        <div className="w-full h-full relative">
          <Image
            src={tech.icon}
            alt={tech.name}
            width={40}
            height={40}
            className="w-full h-full object-contain opacity-90 hover:opacity-100 hover:scale-110 transition-all"
            onError={(e) => {
              // If image fails to load, replace with grey placeholder
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div class="w-full h-full ${tech.color} rounded-lg flex items-center justify-center text-white text-sm font-bold">
                    ${tech.name.charAt(0)}
                  </div>
                `;
              }
            }}
          />
        </div>
      </div>
      
      {/* Tech Name */}
      <span className="text-[10px] sm:text-xs text-center font-medium text-gray-700 dark:text-gray-300 leading-tight group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
        {tech.name}
      </span>
    </div>
  );
}

interface TechStackMarqueeProps {
  className?: string;
}

export default function TechStackMarquee({ className = "" }: TechStackMarqueeProps) {
  return (
    <div className={`w-full ${className}`}>
      {/* Title - matching other component styles */}
      <div className="mb-4">
          <h2 className="text-base font-[family-name:var(--font-instrument-serif)] sm:text-xl mb-3 mt-4 sm:mt-6 -tracking-[0.01em] text-[var(--brand-ink)] opacity-80">
          Stack I use
        </h2>
        <p className="text-sm sm:text-base dark:text-white/70 text-black/70 leading-relaxed">
          Technologies I work with to build products that solve real problems
        </p>
      </div>

      {/* Single Marquee Container */}
      <div>
        <Marquee pauseOnHover className="[--duration:80s] [--gap:1rem]">
          {techStack.map((tech, index) => (
            <TechIcon key={`${tech.name}-${index}`} tech={tech} />
          ))}
        </Marquee>
      </div>
    </div>
  );
}
