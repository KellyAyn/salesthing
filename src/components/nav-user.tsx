"use client"

import { SignedIn, SignOutButton, UserButton } from "@clerk/nextjs"
import { SignedOut } from "@clerk/nextjs"
import { SignUpButton } from "@clerk/nextjs"
import { SignInButton } from "@clerk/nextjs"

import {
  IconDotsVertical,
  IconLogin,
  IconLogout,
  IconUserCircle,
} from "@tabler/icons-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "~/components/ui/sidebar"
import { dark } from "@clerk/themes"
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
