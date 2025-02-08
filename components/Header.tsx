'use client'

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/useTheme"

export default function Header() {
  const { selectedTheme, toggleTheme } = useTheme()

  return (
    <header className="sticky top-0 py-4 bg-transparent backdrop-blur-md mb-8 z-50">
      <div className="flex justify-between items-center">
        <img 
          src="/open-web3-hub-logo.png" 
          alt="open web3 hub logo" 
          className="size-1/2 md:size-1/5"
          loading="eager"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full"
          aria-label="Toggle theme"
        >
          {selectedTheme === 'light' ? (
            <Moon className="h-6 w-6" />
          ) : (
            <Sun className="h-6 w-6" />
          )}
        </Button>
      </div>
    </header>
  )
}
