import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="flex w-full flex-1 flex-col justify-end border-t border-gray-300 dark:border-gray-800">
      <div className="container mx-auto flex items-center justify-between py-4">
        {/* <Icons.logo className="hidden h-6 w-6 md:inline-block" /> */}
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          © {(new Date().getFullYear())}{" "}
          <Link
            href="/"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Jamaica Breaches
          </Link>
        </p>
        <div className="justify-end">
          <p className="text-center text-sm leading-loose text-muted-foreground">
          <Link
            href="/disclaimer"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            Disclaimer
          </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}