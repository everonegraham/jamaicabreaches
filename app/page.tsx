import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Github } from "lucide-react"

import { Breaches, columns } from "@/components/breaches/columns"
import { DataTable } from "@/components/breaches/data-table"
import data from "@/data/breaches.json"

async function getData(): Promise<Breaches[]> {
  return data as Breaches[];
}

export default async function IndexPage() {
  
  const data = await getData()
  // Start table with most recent data
  const data_ = data.reverse();

  return (
    <div className="container items-center gap-6 py-5 md:py-10">
      <div className="mx-auto flex flex-col items-center gap-6 px-4 md:mt-12 xl:mt-16">
        <h1 className="text-center text-4xl font-extrabold leading-tight tracking-tighter md:text-5xl">
          The Jamaican Security Logbook
        </h1>
        <p className="text-center text-lg text-muted-foreground">
          Recording security breaches, data leaks, hacks and scams taking place in Jamaica.
        </p>
        <div className="flex gap-4 text-center">
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
            className={buttonVariants()}
          >
           <Github className="mr-2 h-4 w-4" /> Contribute
          </Link>
        </div>
      </div>
      <div>
        <div className="overflow-x flex h-full flex-1 flex-col">
          <DataTable columns={columns} data={data_} />
        </div>
      </div>
    </div>
  )
}
