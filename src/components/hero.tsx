import Link from "next/link"

import { GithubIcon } from "@/components/icons"
import { Button } from "@/components/ui/button"

/** Each line of the hero trails the one above it, so the stack reads top-down. */
const STAGGER_MS = 90
const delay = (step: number) => ({ animationDelay: `${step * STAGGER_MS}ms` })

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-4 pt-12 pb-10 sm:px-6 md:pt-16 md:pb-14 lg:px-8 lg:pt-20">
      {/* A soft halo behind the headline, breathing slowly so the page is
          never quite still. */}
      <div
        aria-hidden
        className="hero-glow animate-glow-drift pointer-events-none absolute inset-0 -z-10"
      />

      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
        <p
          className="animate-fade-up text-xs font-semibold tracking-[0.18em] text-brand uppercase"
          style={delay(0)}
        >
          The Jamaican Security Logbook
        </p>

        <h1
          className="animate-fade-up font-heading text-4xl font-semibold tracking-tight text-balance md:text-5xl lg:text-6xl"
          style={delay(1)}
        >
          Jamaica Data Breaches &amp; Cybersecurity Incidents
        </h1>

        <p
          className="animate-fade-up max-w-[46ch] text-base leading-relaxed text-muted-foreground sm:text-lg"
          style={delay(2)}
        >
          Recording security breaches, data leaks, hacks and scams taking place
          in Jamaica.
        </p>

        <Button
          size="lg"
          nativeButton={false}
          style={delay(3)}
          className="animate-fade-up mt-1 h-11 gap-2 px-6 text-base shadow-lg shadow-primary/20 transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/30 has-data-[icon=inline-start]:pl-5"
          render={
            <Link
              href="https://github.com/everonegraham/jamaicabreaches"
              target="_blank"
              rel="noreferrer"
            />
          }
        >
          <GithubIcon data-icon="inline-start" />
          Contribute
        </Button>

        {/* Draws itself out last, handing the eye down to the table. */}
        <div
          aria-hidden
          className="animate-sweep-in mt-6 h-px w-full max-w-sm bg-linear-to-r from-transparent via-primary/60 to-transparent"
          style={delay(4)}
        />
      </div>
    </section>
  )
}
