"use client"

import Link from "next/link"
import { Github } from "lucide-react"

export function Hero() {
  return (
    <section className="space-y-6 pb-4 pt-6 md:pb-6 md:pt-10 lg:pb-8 lg:pt-16">
      <div className="container flex max-w-[64rem] flex-col items-center gap-6 text-center">
        <h1 className="font-heading text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl heading-gradient animate-fade-up pb-2">
          The Jamaican Security Logbook
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 animate-fade-up">
          Recording security breaches, data leaks, hacks and scams taking place in Jamaica.
        </p>
        <div className="space-x-4 animate-fade-up">
          <Link
            href="https://github.com/everonegraham/jamaicabreaches"
            target="_blank"
            rel="noreferrer"
            className="hero-button hero-button-primary inline-flex items-center gap-2"
          >
            <Github className="h-5 w-5" />
            Contribute
          </Link>
        </div>
      </div>
    </section>
  )
} 