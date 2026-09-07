'use client'

import Image from 'next/image'

interface BannerSectionProps {
  quote?: string
  bannerImage?: string
}

export default function BannerSection({
  quote = "You make your own luck if you stay at it long enough.",
  bannerImage = "/banner.jpg"
}: BannerSectionProps) {
  return (
    <div className="w-full mb-2 relative">
      <div className="relative overflow-hidden rounded-2xl" style={{ height: 'auto' }}>
        <Image
          alt="Banner"
          width={1240}
          height={900}
          className="rounded-2xl w-full h-[200px] sm:h-[270px] object-cover"
          src={bannerImage}
          style={{ color: 'transparent', minHeight: '100px' }}
          priority
        />
        {quote ? (
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <p className="text-white text-base sm:text-xl italic font-[family-name:var(--font-instrument-serif)] text-center">{quote}</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
