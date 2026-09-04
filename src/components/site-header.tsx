"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ModeToggle } from "@/components/mode-toggle"
import { XIcon, GithubIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/** How far down the page the viewer is, 0–1, for the header's progress rule. */
function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight
      setProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0)
    }

    // Scroll fires far faster than we can paint; coalesce onto the frame.
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
    }
  }, [])

  return progress
}

/** Nav item whose green underline is drawn on hover and pinned when active. */
function NavLink({
  href,
  active,
  className,
  children,
}: {
  href: string
  active: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative py-1 text-sm font-medium transition-colors duration-200",
        active ? "font-semibold text-brand" : "text-muted-foreground hover:text-brand",
        className
      )}
    >
      {children}
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-0 -bottom-0.5 h-px origin-left bg-primary transition-transform duration-300 ease-out",
          active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        )}
      />
    </Link>
  )
}

export function SiteHeader() {
  const pathname = usePathname()
  const progress = useScrollProgress()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex h-16 items-center justify-between">
        <Link href="/" className="group flex shrink-0 items-center gap-2.5">
          {/* The JB monogram is drawn for a black ground, so it keeps one —
              keyed transparent, its gold J would disappear on the light header.
              48px source shown at 24px lands 1:1 on a 2x display. */}
          <Image
            src="/logo.png"
            alt=""
            aria-hidden
            width={48}
            height={48}
            priority
            className="size-6 rounded-md ring-1 ring-border transition-all duration-300 group-hover:scale-105 group-hover:ring-primary/50"
          />
          <span className="font-bold whitespace-nowrap transition-colors duration-200 group-hover:text-brand">
            Jamaica Breaches
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-6">
          <nav className="flex items-center gap-3 sm:gap-6">
            <NavLink
              href="/"
              active={pathname === "/"}
              className="hidden sm:inline-block"
            >
              Home
            </NavLink>
            <NavLink href="/about" active={pathname === "/about"}>
              About
            </NavLink>
          </nav>

          <div className="flex items-center gap-0.5 sm:gap-2">
            <Button
              variant="ghost"
              size="icon"
              nativeButton={false}
              className="transition-transform duration-200 hover:-translate-y-0.5 hover:text-brand"
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
              className="transition-transform duration-200 hover:-translate-y-0.5 hover:text-brand"
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

      {/* Reading progress, riding the header's own bottom border. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-px h-px overflow-hidden"
      >
        <div
          className="h-full origin-left bg-primary transition-transform duration-150 ease-out"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>
    </header>
  )
}
