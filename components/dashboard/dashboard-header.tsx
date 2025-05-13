"use client"

import Link from "next/link"
import { UserButton } from "@/components/auth/user-button"
import { MobileNav } from "@/components/mobile-nav"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"
import { usePathname } from "next/navigation"

export function DashboardHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="hidden items-center space-x-2 md:flex">
            <Icons.logo className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">Raffily</span>
          </Link>
          <MainNav />
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          {pathname.startsWith("/dashboard") && (
            <Button variant="outline" size="sm" className="ml-4 mr-2">
              <Link href="/dashboard/create">Create Raffle</Link>
            </Button>
          )}
          <UserButton />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

