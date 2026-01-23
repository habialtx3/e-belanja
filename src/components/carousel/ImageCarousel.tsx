"use client"

import { useEffect, useRef } from "react"
import Flickity from "flickity"

export default function ImageCarousel() {
  const carouselRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!carouselRef.current) return

    const flkty = new Flickity(carouselRef.current, {
      cellAlign: "left",
      contain: true,
      wrapAround: true,
      prevNextButtons: false,
      pageDots: false,
      draggable: true,
      selectedAttraction: 0.015,
      friction: 0.28,
    })

    return () => flkty.destroy()
  }, [])

  return (
    <div ref={carouselRef} className="main-carousel mt-[30px]">
      {/* items */}
    </div>
  )
}
