import { BreachesTable } from "@/components/breaches-table"
import { Hero } from "@/components/hero"
import path from 'path'
import { promises as fs } from 'fs'
import { type Breach } from "@/types/breach"

async function getBreaches(): Promise<Breach[]> {
  const jsonPath = path.join(process.cwd(), 'data', 'breaches.json')
  const fileContents = await fs.readFile(jsonPath, 'utf8')
  return JSON.parse(fileContents)
}

export default async function Home() {
  const breaches = await getBreaches()

  return (
    <main className="min-h-screen">
      <Hero />
      <div className="max-w-7xl mx-auto px-8 mb-16">
        <div className="glass-card p-6">
          <BreachesTable data={breaches} />
        </div>
      </div>
    </main>
  )
}
