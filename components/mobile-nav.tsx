"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/entries",
      label: "Entries",
      active: pathname === "/dashboard/entries",
    },
    {
      href: "/dashboard/analytics",
      label: "Analytics",
      active: pathname === "/dashboard/analytics",
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      active: pathname === "/dashboard/settings",
    },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Icons.menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="pr-0">
        <div className="px-7">
          <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
            <Icons.logo className="mr-2 h-4 w-4" />
            <span className="font-bold">Raffily</span>
          </Link>
        </div>
        <nav className="mt-4 flex flex-col gap-3 px-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex w-full items-center rounded-md px-5 py-2 text-sm font-medium hover:bg-accent",
                route.active ? "bg-accent" : "transparent",
              )}
              onClick={() => setOpen(false)}
            >
              {route.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

