"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { Menu, X as Close } from 'lucide-react'
import { ThemeToggle } from "@/components/theme-toggle"
import { NavItem } from "@/types/nav"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import React from "react"


export function SiteHeader() {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false)
  const pathname = usePathname()
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex w-full items-center justify-between p-4">

        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2" passHref>
            <span className="font-bold sm:inline-block">{siteConfig.name}</span>
          </Link>
        </div>

        {/* Nav */}
        <div className="z-10 flex grow justify-center">
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            {siteConfig.mainNav?.map(
              (item, index) =>
                item.href && (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex items-center rounded p-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {item.title}
                  </Link>
                )
            )}
          </nav>
        </div>
        
        {/* Social Icons */}
        <div className="hidden items-center space-x-4 md:flex">
          <nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              passHref
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                <Icons.gitHub className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </div>
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              passHref
            >
              <div
                className={buttonVariants({
                  size: "sm",
                  variant: "ghost",
                })}
              >
                <Icons.twitter className="h-5 w-5 fill-current" />
                <span className="sr-only">Twitter</span>
              </div>
            </Link>
            <ThemeToggle />
          </nav>
        </div>
        
        {/* Mobile Button */}
        <button
          className="flex items-center space-x-2 md:hidden"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <Close /> : <Menu />}
        </button>
      </div>

      {showMobileMenu && (
        <div
          className={cn(
            "absolute inset-x-0 top-full z-50 flex flex-col items-center justify-center bg-background p-6 shadow-md md:hidden"
          )}
        >
          <div className="relative z-20 flex w-full max-w-md flex-col items-center justify-center gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
    
            <nav className="flex flex-col items-center justify-center text-sm">
              {siteConfig.mainNav?.map((item, index) => {
                if (item.href) {
                  return (
                    <Link
                      key={index}
                      href={item.href}
                      className={cn(
                        "flex w-full items-center justify-center rounded-md p-2 text-sm font-medium hover:underline",
                        pathname === item.href ? "text-foreground" : "text-muted-foreground"
                      )}
                      onClick={() => setShowMobileMenu(!showMobileMenu)}
                    >
                      {item.title}
                    </Link>
                  );
                }
                return null;
              })}
              <Separator className="my-2 mt-6" />
              <div className="flex items-center justify-between">
                
                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  passHref
                >
                  <div
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                  >
                    <Icons.gitHub className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </div>
                </Link>
                <Link
                  href={siteConfig.links.twitter}
                  target="_blank"
                  rel="noreferrer"
                  passHref
                >
                  <div
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                  >
                    <Icons.twitter className="h-5 w-5 fill-current" />
                    <span className="sr-only">Twitter</span>
                  </div>
                </Link>
                <ThemeToggle />
              </div>
            </nav>
          </div>
        </div>
      )}

    </header>
  )
}
