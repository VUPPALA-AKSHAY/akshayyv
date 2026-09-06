import { FAQ } from '@/types/blog'

export const faqs: FAQ[] = [
  {
    id: 'ai-as-tool',
    question: 'How I Use AI as a Tool, Not a Crutch',
    answer: `AI is not my replacement — it's my force multiplier.

I use AI for:
• Exploring approaches
• Writing boilerplate
• Stress-testing ideas

But I never let it:
• Decide architecture blindly
• Hide things I don't understand
• Replace debugging and reasoning

If I can't explain a piece of code in simple words, it doesn't go into production.

Using AI this way helps me move faster without losing control — and keeps my skills sharp.`
  },
  {
    id: 'rag-agents',
    question: 'What I Learned Building RAG Apps and AI Agents',
    answer: `Building "Chat with Your Documents" and my Hermes outreach agent taught me that retrieval quality matters more than model size.

What works for me:
• Chunk documents thoughtfully, then test retrieval first
• Use semantic + hybrid search (Pinecone, Qdrant) before tuning prompts
• Give agents narrow tools, clear filters and cron-style schedules
• Log every agent step — orchestration bugs hide in silence

Small, observable systems beat big black boxes.`
  },
  {
    id: 'frontend-focus',
    question: 'Why I Pair Frontend Craft with AI',
    answer: `A powerful model with a confusing UI still feels broken.

So I build both sides:
• React + Next.js frontends that are fast and simple
• Node.js + Express backends with clean REST APIs
• AI features (Gemini, Groq, DeepSeek) that feel instant, not gimmicky

My rule is simple:
• Build first
• Learn on demand
• Refine after

Smart backend, user-focused frontend — that's the combo I aim for.`
  }
]

// Alias for blogs page compatibility
export const blogs = faqs

export const getFAQById = (id: string): FAQ | undefined => {
  return faqs.find(faq => faq.id === id)
}

// Alias for blog pages
export const getBlogById = getFAQById
