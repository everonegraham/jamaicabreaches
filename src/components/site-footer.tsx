"use client"

import Link from "next/link"

/** Underline is drawn on hover rather than always sitting there. */
const footerLink =
  "group relative font-medium text-muted-foreground transition-colors duration-200 hover:text-brand"

const footerUnderline =
  "absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-primary transition-transform duration-300 ease-out group-hover:scale-x-100"

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
      {/* Closes the page on the same green hairline the hero opens with. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-px mx-auto h-px w-full max-w-sm bg-linear-to-r from-transparent via-primary/50 to-transparent"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex h-14 items-center justify-between">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()}{" "}
          <Link href="/" className={footerLink}>
            Jamaica Breaches
            <span aria-hidden className={footerUnderline} />
          </Link>
        </p>
        <Link href="/disclaimer" className={`text-sm ${footerLink}`}>
          Disclaimer
          <span aria-hidden className={footerUnderline} />
        </Link>
      </div>
    </footer>
  )
}
