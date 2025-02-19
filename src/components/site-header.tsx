"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Github } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import { XIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-8 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="inline-block font-bold">Jamaica Breaches</span>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/" 
                ? "text-primary font-semibold" 
                : "text-muted-foreground"
            )}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/about" 
                ? "text-primary font-semibold" 
                : "text-muted-foreground"
            )}
          >
            About
          </Link>
        </nav>

        <div className="flex items-center space-x-2">
          <Link
            href="https://github.com/everonegraham/jamaicabreaches"
            target="_blank"
            rel="noreferrer"
          >
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-background text-sm font-medium transition-colors hover:bg-muted hover:text-primary">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </div>
          </Link>
          <Link
            href="https://x.com/jamaicabreaches"
            target="_blank"
            rel="noreferrer"
          >
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-background text-sm font-medium transition-colors hover:bg-muted hover:text-primary">
              <XIcon className="h-4 w-4" />
              <span className="sr-only">X (formerly Twitter)</span>
            </div>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
} 