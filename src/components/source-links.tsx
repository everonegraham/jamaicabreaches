"use client"

import { Link2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { type Breach } from "@/types/breach"

export function SourceLinks({ sources }: { sources: Breach["source"] }) {
  const entries = Object.entries(sources ?? {}).filter(
    (entry): entry is [string, string] => Boolean(entry[1])
  )

  if (entries.length === 0) {
    return null
  }

  return (
    <Popover>
      <PopoverTrigger
        aria-label="View sources"
        render={
          <Button variant="outline" size="icon-sm" className="rounded-full" />
        }
      >
        <Link2 />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-56 gap-0.5 p-1.5">
        {entries.map(([name, url]) => (
          <a
            key={url}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted"
          >
            <Link2 className="size-3 opacity-70 group-hover:opacity-100" />
            <span className="group-hover:underline">{name}</span>
          </a>
        ))}
      </PopoverContent>
    </Popover>
  )
}
