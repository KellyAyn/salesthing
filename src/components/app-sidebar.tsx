import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "~/components/ui/sidebar"
import { IconChartBar, IconLock, IconSettings, IconUserHexagon, IconUserPlus } from "@tabler/icons-react"
import Link from "next/link"
import { UserButton } from "@clerk/nextjs"
import { House } from 'lucide-react';

  const items = [
    {
        title: "Home",
        url:"/",
        icon:<House />
    },
    {
        title: "Prospecting",
        url: "/prospecting",
        icon: <IconUserPlus />
    },
    {
        title: "Analytics",
        url: "/analytics",
        icon: <IconChartBar />
    },
    {
        title: "Admin Console",
        url: "/admin",
        icon: <IconLock />
    },
    {
        title: "Testing Button",
        url: "/testing",
        icon: <IconLock />
    }
  ]
   
  const footerItems = [
    {
        title: "Settings",
        url: "#",
        icon: <IconSettings />
    },
  ]

export function AppSidebar() {
return (
    <Sidebar variant="inset" collapsible="offcanvas">
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel className="text-lg font-semibold flex justify-center py-2">Salesthing</SidebarGroupLabel>
                <SidebarGroupContent className="flex flex-col gap-2 list-none w-full">
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <Link href={item.url}>
                                    {item.icon}
                                    {item.title}
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
        <SidebarGroupContent className="flex flex-col gap-2 list-none w-full">
                    {footerItems.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <Link href={item.url}>
                                    {item.icon}
                                    {item.title}
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarGroupContent>
            <div className="flex justify-center items-center w-full">
                <UserButton 
                showName={true}
                appearance={{
                    elements: {
                        avatarImage: "w-10 h-24",
                        userButtonPopoverCard: "w-80"
                    }
                }}
                />
            </div>
        </SidebarFooter>
    </Sidebar>
)
}
