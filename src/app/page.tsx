import type { Metadata } from "next"
import { BreachesTable } from "@/components/breaches-table"
import { Hero } from "@/components/hero"
import path from 'path'
import { promises as fs } from 'fs'
import { type Breach } from "@/types/breach"
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site"

export const metadata: Metadata = {
  alternates: { canonical: "/" },
}

async function getBreaches(): Promise<Breach[]> {
  const jsonPath = path.join(process.cwd(), 'data', 'breaches.json')
  const fileContents = await fs.readFile(jsonPath, 'utf8')
  return JSON.parse(fileContents)
}

export default async function Home() {
  const breaches = await getBreaches()

  const datasetJsonLd = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: "Jamaican Cybersecurity Breaches",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    isAccessibleForFree: true,
    creator: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
    keywords: ["data breach", "cybersecurity", "Jamaica", "hacks", "scams"],
    measurementTechnique: "Manually curated public reports",
    variableMeasured: ["target", "year", "type", "source"],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }}
      />
      <Hero />
      <div className="mx-auto w-full max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
        <BreachesTable data={breaches} />
      </div>
    </>
  )
}
