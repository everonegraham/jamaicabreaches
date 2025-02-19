import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

export async function GET() {
  try {
    // Read the JSON file from a secure location
    const jsonPath = path.join(process.cwd(), 'data', 'breaches.json')
    const fileContents = await fs.readFile(jsonPath, 'utf8')
    const data = JSON.parse(fileContents)

    // Here you could add additional security checks, filtering, or transformations

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error reading breaches data:', error)
    return NextResponse.json(
      { error: 'Failed to load breaches data' },
      { status: 500 }
    )
  }
} 