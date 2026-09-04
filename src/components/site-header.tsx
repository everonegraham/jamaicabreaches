"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { XIcon, GithubIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="inline-block font-bold">Jamaica Breaches</span>
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <nav className="flex items-center gap-3 sm:gap-6">
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

          <div className="flex items-center gap-2 sm:gap-3">
            <Button
              variant="ghost"
              size="icon"
              nativeButton={false}
              render={
                <Link
                  href="https://github.com/everonegraham/jamaicabreaches"
                  target="_blank"
                  rel="noreferrer"
                />
              }
            >
              <GithubIcon />
              <span className="sr-only">GitHub</span>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              nativeButton={false}
              render={
                <Link
                  href="https://x.com/jamaicabreaches"
                  target="_blank"
                  rel="noreferrer"
                />
              }
            >
              <XIcon />
              <span className="sr-only">X (formerly Twitter)</span>
            </Button>
            <ModeToggle />
          </div>
        </div>
      </div>
    </header>
  )
} 