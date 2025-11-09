'use client'

import Image from 'next/image'

export default function ProductImage({ src, alt, index }) {
  return (
    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
      <Image
        src={src}
        alt={alt}
        width={400}
        height={400}
        className="w-full h-full object-cover rounded-lg"
        onError={(e) => {
          e.target.style.display = 'none'
          e.target.nextSibling.style.display = 'flex'
        }}
      />
      <div className="w-full h-full flex items-center justify-center text-gray-400" style={{ display: 'none' }}>
        📷 Image {index + 1}
      </div>
    </div>
  )
}