'use client'

import { useEffect, useState } from "react"
import { ArrowUpIcon } from "lucide-react"

export default function ScrollToTop() {
  const [showScrollToTop, setShowScrollToTop] = useState<boolean>(false)
  const [lastScrollY, setLastScrollY] = useState<number>(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY < lastScrollY && currentScrollY > 250) {
        setShowScrollToTop(true)
      } else {
        setShowScrollToTop(false)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {showScrollToTop ? (
        <button
          onClick={scrollToTop}
          className="fixed bottom-12 right-10 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-accent hover:text-black transition"
          aria-label="Scroll to top"
        >
          <ArrowUpIcon className="h-6 w-6" />
        </button>
      ) : null}
    </>
  )
}