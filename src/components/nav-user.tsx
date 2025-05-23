"use client"

import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs"

import {
  IconLogin,
} from "@tabler/icons-react"

import {
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar"
export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SignedIn>
          <UserButton showName={true} appearance={{
            elements: {
              userButtonBox: "w-full flex items-center gap-2 px-3 py-2",
              userButtonAvatarBox: "order-last ml-auto",
              userButtonTrigger: "w-full",
              userButtonPopoverCard: {
                zIndex: "50",
              },
            }
          }}/>
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <button className="w-full flex items-center gap-2">
              <IconLogin />
              Login
            </button>
          </SignInButton>
        </SignedOut>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
