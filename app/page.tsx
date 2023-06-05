import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"

import { Breaches, columns } from "@/components/breaches/columns"
import { DataTable } from "@/components/breaches/data-table"
import data from "@/data/breaches.json"

async function getData(): Promise<Breaches[]> {
  return data as Breaches[];
}

export default async function IndexPage() {
  
  const data = await getData()

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          The Jamaican Security Logbook
        </h1>
        <p className="text-lg text-muted-foreground">
          Recording security breaches, data leaks, hacks and scams taking place in Jamaica.
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <DataTable columns={columns} data={data} />
      </div>
    </section>
  )
}
