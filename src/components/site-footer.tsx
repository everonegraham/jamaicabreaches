"use client"

import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-8 flex h-14 items-center justify-between">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()}{" "}
          <Link 
            href="/"
            className="font-medium underline underline-offset-4 hover:text-primary transition-colors"
          >
            Jamaica Breaches
          </Link>
        </p>
        <Link
          href="/disclaimer"
          className="text-sm text-muted-foreground underline underline-offset-4 hover:text-primary transition-colors"
        >
          Disclaimer
        </Link>
      </div>
    </footer>
  )
} 