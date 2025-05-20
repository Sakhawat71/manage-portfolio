"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { HomeIcon } from "lucide-react"

export const navData = [
    {
        title: "Main Navigation",
        items: [
            {
                label: "Dashboard",
                href: "/dashboard",
            },
            {
                label: "Projects",
                href: "/dashboard/projects",
            },
            {
                label: "Skills",
                href: "/dashboard/skills",
            },
            {
                label: "Contacts",
                href: "/dashboard/contacts",
            },
            {
                label: "Blogs",
                href: "/dashboard/blogs",
            },
            {
                label: "Educations",
                href: "/dashboard/educations",
            },
            {
                label: "Experiences",
                href: "/dashboard/experiences",
            },
        ],
    },
]


export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()

    return (
        <Sidebar {...props} className="px-5">
            <SidebarHeader className="flex items-center justify-between pt-9">
                <Link href="/">
                    <HomeIcon className="h-6 w-6" />
                </Link>
            </SidebarHeader>

            <SidebarContent>
                {navData.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {group.items.map((item) => {
                                    const isActive = pathname === item.href
                                    return (
                                        <SidebarMenuItem key={item.href}>
                                            <SidebarMenuButton asChild isActive={isActive}>
                                                <Link href={item.href}>{item.label}</Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    )
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
            </SidebarContent>

            <SidebarRail />
        </Sidebar>
    )
}
