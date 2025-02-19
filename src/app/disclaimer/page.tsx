import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Disclaimer - Jamaica Breaches",
  description: "Important disclaimer about the information provided on Jamaica Breaches",
}

export default function DisclaimerPage() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-12">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Disclaimer</h1>
        <div className="prose dark:prose-invert max-w-none">
          <div className="bg-muted/50 border rounded-lg p-6 space-y-4">
            <p className="leading-7 text-muted-foreground">
              Please be aware that the information provided on this website regarding cybersecurity breaches, 
              data leaks, hacks and scams at other companies are based on publicly available data and may not 
              always be confirmed.
            </p>
            <p className="leading-7 text-muted-foreground">
              We strive to provide accurate and up-to-date information, but it is important to note that some 
              listings may be incomplete or incorrect. We advise all users to always refer to multiple sources 
              and not rely solely on the information provided on Jamaica Breaches.
            </p>
            <p className="leading-7 text-muted-foreground">
              This website is intended for informational purposes only and should not be used as the sole basis 
              for any decision-making.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}