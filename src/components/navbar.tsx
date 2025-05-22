"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "~/components/ui/button"
import { UserButton } from "@clerk/nextjs"
import { SignedIn } from "@clerk/nextjs"
import { SignedOut } from "@clerk/nextjs"
import { SignUpButton } from "@clerk/nextjs"
import { SignInButton } from "@clerk/nextjs"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="size-8 rounded-md bg-violet-600 flex items-center justify-center m-2.5">
              <span className="font-bold text-white">S</span>
            </div>
            <span className="text-lg font-bold">SalesThing</span>
          </Link>

          <nav className="hidden md:flex ml-8 gap-6">
            <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              1
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              2
            </Link>
            <Link href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              3
            </Link>
            <Link href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              4
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  )
}
