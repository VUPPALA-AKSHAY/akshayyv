import { Project } from '@/types/project'

export const projects: Project[] = [
  {
    id: "hirelens",
    title: "HireLens",
    description: "AI tool that analyzes LinkedIn profiles against job roles with Google Gemini — skill gaps, missing skills, certifications and project suggestions for HRs and job seekers.",
    longDescription: "Founder of this project\n\nHireLens uses Google Gemini AI to analyze LinkedIn profiles against job roles. It generates a detailed summary, compares profile skills with the selected role, identifies missing or mismatched skills, detects the actual best-fit role, and suggests certifications, projects and improvements.\n\nFeatures:\n• LinkedIn profile vs job-role skill comparison\n• Automatic role-mismatch detection with correction\n• Certification, project and profile improvement suggestions\n• Auto emails to HRs and candidates about fit\n• Supabase auth with Google OAuth 2.0",
    liveLink: "https://hirelenss.in/",
    githubLink: "https://github.com/VUPPALA-AKSHAY",
    image: "/images/hirelens-dark.png",
    tags: [
      "React",
      "Node.js",
      "Express.js",
      "Google Gemini",
      "Supabase",
      "Google OAuth 2.0",
    ],
  },
  {
    id: "hermes-agent",
    title: "Hermes Job Outreach Agent",
    description: "Autonomous agent that finds companies by role, skills and filters, scrapes career pages for emails, and sends personalized outreach + HR follow-ups automatically.",
    longDescription: "Founder of this project\n\nA Hermes agent that automates job outreach end-to-end. Users enter target role, skills and filters (e.g. startups only, 10 companies per country). The agent searches companies across countries, scrapes career/contact pages for email addresses, sends personalized outreach emails, and drafts or sends follow-up replies to HR automatically.\n\nBuilt with Python, Docker, AutoBrowser, VPS, scrapers, SMTP, APIs, cron jobs, agent orchestration, subagents and custom skills.",
    githubLink: "https://github.com/VUPPALA-AKSHAY",
    image: "/images/hermes-dark.png",
    tags: [
      "Python",
      "Docker",
      "Web Scrapers",
      "SMTP",
      "APIs",
      "Agent Orchestration",
    ],
  },
  {
    id: "chat-docs",
    title: "Chat with Your Documents",
    description: "RAG-powered chatbot that interacts with multiple document formats and retrieves insights — built during the Infosys Springboard internship.",
    longDescription: "Built during Infosys Springboard 5.0 internship\n\nAn AI-powered tool to interact with multiple documents and retrieve insights from various document formats using Retrieval-Augmented Generation (RAG) and NLP techniques. Strengthened practical knowledge of AI concepts and API integration.",
    githubLink: "https://github.com/VUPPALA-AKSHAY",
    image: "/images/chatdocs-dark.png",
    tags: [
      "Python",
      "RAG",
      "NLP",
      "LLMs",
      "Semantic Search",
    ],
  },
  {
    id: "kl-chatbot",
    title: "KL University Chatbot",
    description: "Full-stack campus chatbot answering admission queries with Gemini, Groq, DeepSeek and Qwen, real-time web scraping and ElevenLabs voice interaction.",
    longDescription: "Founder of this project\n\nA full-stack chatbot for KL University with HTML, CSS, JavaScript frontend and Node.js + Express.js backend. Integrates Google Gemini, Groq, DeepSeek, Qwen and other AI models to answer admission and campus queries through real-time web scraping, voice interaction using ElevenLabs TTS, Vapi and Tavily Search API for 24/7 AI-assisted student support.",
    githubLink: "https://github.com/VUPPALA-AKSHAY",
    image: "/images/klbot-dark.png",
    tags: [
      "JavaScript",
      "Node.js",
      "Express.js",
      "Google Gemini",
      "Groq",
      "ElevenLabs",
    ],
  },
  {
    id: "code-debugger",
    title: "AI Code Debugger",
    description: "Web app for automated code analysis and error resolution powered by Groq (Llama 3.3 70B). Hackathon finalist at Igbara.AI 2024.",
    longDescription: "Founder of this project — Igbara.AI Hackathon Finalist (2024)\n\nA code debugging web application built with React, Node.js and Express.js, integrated with Groq API (Llama 3.3 70B) for automated code analysis and error resolution. Reached the presentation stage, showcasing real-time AI-powered debugging.",
    liveLink: "https://aicode-debugger-akshayy-23266.onrender.com",
    githubLink: "https://github.com/VUPPALA-AKSHAY",
    image: "/images/debugger-dark.png",
    tags: [
      "React",
      "Node.js",
      "Express.js",
      "Groq",
      "Llama 3.3 70B",
    ],
  },
  {
    id: "calendar-agent",
    title: "Calendar AI Agent",
    description: "Intelligent agent that understands chat-based scheduling commands and creates Google Calendar events automatically via n8n.",
    longDescription: "Founder of this project\n\nAn intelligent agent that understands chat-based scheduling commands and automatically creates events in Google Calendar using n8n Cloud and API integration.",
    githubLink: "https://github.com/VUPPALA-AKSHAY",
    image: "/images/calendar-dark.png",
    tags: [
      "n8n",
      "Google Calendar API",
      "AI Agents",
      "Automation",
    ],
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id)
}

export const getAllProjects = (): Project[] => {
  return projects
}
