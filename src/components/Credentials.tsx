'use client'

const education = [
  {
    school: "KLH Deemed to be University, Hyderabad",
    detail: "Bachelor of Computer Applications (BCA) — CGPA 8.55",
    duration: "2023 – 2026",
  },
  {
    school: "Pallavi Model School (CBSE)",
    detail: "Intermediate",
    duration: "2021 – 2023",
  },
  {
    school: "Ocimum International School (CBSE)",
    detail: "Secondary School",
    duration: "2020 – 2021",
  },
]

const certifications = [
  "Salesforce Certified AI Associate",
  "Microsoft Certified Azure AI Fundamentals",
  "Google Cloud Certified Digital Leader",
  "Infosys Artificial Intelligence Primer",
]

const achievement = "Igbara.AI Hackathon Finalist (2024) — AI Code Debugger, reached the presentation stage."

export default function Credentials() {
  return (
    <div className="space-y-6 dark:text-white/70 text-black/70 pb-4">
      <div className="space-y-3">
        {education.map((e) => (
          <div key={e.school} className="rounded-lg px-4 sm:px-5 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <div>
              <h3 className="font-medium dark:text-white text-black text-sm sm:text-base">{e.school}</h3>
              <p className="text-[11px] sm:text-sm opacity-70">{e.detail}</p>
            </div>
            <p className="text-[10px] sm:text-sm opacity-50 shrink-0">{e.duration}</p>
          </div>
        ))}
      </div>
      <div className="px-4 sm:px-5">
        <h4 className="text-xs sm:text-sm font-medium opacity-60 mb-2">Certifications</h4>
        <ul className="space-y-2 text-xs sm:text-sm opacity-80">
          {certifications.map((c) => (
            <li key={c} className="flex gap-2.5">
              <span className="text-[var(--brand)] shrink-0 mt-1.5">•</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="px-4 sm:px-5">
        <h4 className="text-xs sm:text-sm font-medium opacity-60 mb-2">Achievement</h4>
        <p className="text-xs sm:text-sm opacity-80">{achievement}</p>
      </div>
    </div>
  )
}
