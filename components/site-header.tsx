"use client"

import Link from "next/link"

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
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex w-full items-center justify-between p-4">

        {/* Nav Start */}
        <div className="mr-4 md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold sm:inline-block">{siteConfig.name}</span>
          </Link>
          {siteConfig.mainNav?.length ? (
            <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
              {siteConfig.mainNav?.map(
                (item, index) =>
                  item.href && (
                    <Link
                      key={index}
                      href={item.href}
                      className={cn(
                        "flex items-center text-sm font-medium text-muted-foreground"
                      )}
                    >
                      {item.title}
                    </Link>
                  )
              )}
            </nav>
          ) : null}
        </div>

        <div className="hidden flex-1 items-center justify-end space-x-4 md:flex">
          <nav className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
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
        {/* Nav Ends */}
        
        {/* Mobile Nav Start */}
        <button
          className="flex items-center space-x-2 md:hidden"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {showMobileMenu ? <Close /> : <Menu />}
        </button>
        {showMobileMenu && (
          <div
            className={cn(
              "fixed inset-0 top-16 z-50 grid grid-flow-row auto-rows-max overflow-auto p-6 shadow-md animate-in slide-in-from-bottom-80 md:hidden"
            )}
          >
            <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
      
              <nav className="grid grid-flow-row auto-rows-max text-sm">
              {siteConfig.mainNav?.map(
                    (item, index) =>
                      item.href && (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
                    )}
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                  >
                    {item.title}
                  </Link>
                ))}
                <Separator className="my-2 mt-6" />
                <div className="justfiy-between flex items-center">
                  
                  <Link
                    href={siteConfig.links.github}
                    target="_blank"
                    rel="noreferrer"
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

        {/* Mobile Nav End */}
      </div>
    </header>
  )
}
