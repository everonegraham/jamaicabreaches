import { Metadata } from "next"
import { SITE_URL, SITE_NAME, OG_IMAGE } from "@/lib/site"

const description =
  "Learn more about Jamaica Breaches — keeping you informed about cybersecurity incidents, data breaches and scams affecting Jamaican organizations."

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    url: `${SITE_URL}/about`,
    title: "About · Jamaica Breaches",
    description,
    images: [OG_IMAGE],
  },
}

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Jamaica Breaches</h1>
        <div className="prose dark:prose-invert max-w-none">
          <div className="bg-muted/50 border rounded-lg p-6 space-y-4">
            <p className="leading-7 text-muted-foreground">
              Jamaica Breaches aims to inform and empower individuals and businesses about the latest cybersecurity breaches, 
              data leaks, hacks and scams taking place in Jamaica. We do this this by logging some information about these events, 
              along with sources. We believe that knowledge is power. By staying informed, we can all make better decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 