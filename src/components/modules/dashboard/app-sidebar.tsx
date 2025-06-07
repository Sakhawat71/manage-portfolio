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
import { ChevronDown, ChevronRight, HomeIcon } from "lucide-react"

export const navData = [
    {
        title: "Main Navigation",
        collapsible: false,
        items: [
            { label: "Dashboard", href: "/dashboard" },
            { label: "Contacts", href: "/dashboard/contacts" },
        ],
    },
    {
        title: "Project Management",
        collapsible: true,
        items: [
            { label: "Projects", href: "/dashboard/projects" },
            { label: "Add Project", href: "/dashboard/projects/add-project" },
        ],
    },
    {
        title: "Skills Management",
        collapsible: true,
        items: [
            { label: "Skills", href: "/dashboard/skills" },
            { label: "Add Skills", href: "/dashboard/skills/add-skill" },
        ],
    },
    {
        title: "Blogs Management",
        collapsible: true,
        items: [
            { label: "Blogs", href: "/dashboard/blogs" },
            { label: "Add Blogs", href: "/dashboard/blogs/add-blog" },
        ],
    },
    {
        title: "Educations Management",
        collapsible: true,
        items: [
            { label: "Educations", href: "/dashboard/educations" },
            { label: "Add Educations", href: "/dashboard/educations/add-education" },
        ],
    },
    {
        title: "Experiences Management",
        collapsible: true,
        items: [
            { label: "Experiences", href: "/dashboard/experiences" },
            { label: "Add Experiences", href: "/dashboard/experiences/add-experience" },
        ],
    },
]

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()
    const [openGroup, setOpenGroup] = React.useState<string | null>(null)

    const toggleGroup = (title: string) => {
        setOpenGroup(prev => (prev === title ? null : title))
    }

    return (
        <Sidebar {...props} className="px-5">
            <SidebarHeader className="flex items-center justify-between pt-9">
                <Link href="/">
                    <HomeIcon className="h-6 w-6" />
                </Link>
            </SidebarHeader>

            <SidebarContent>
                {navData.map((group) => {
                    const isCollapsible = group.collapsible
                    const isOpen = openGroup === group.title

                    return (
                        <SidebarGroup key={group.title}>
                            <SidebarGroupLabel
                                onClick={() => isCollapsible && toggleGroup(group.title)}
                                className={`flex items-center justify-between cursor-pointer ${isCollapsible ? "hover:text-primary" : ""}`}
                            >
                                {group.title}
                                {isCollapsible && (
                                    isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                                )}
                            </SidebarGroupLabel>

                            {/* Conditionally render content if not collapsible or open */}
                            {(!isCollapsible || isOpen) && (
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
                            )}
                        </SidebarGroup>
                    )
                })}
            </SidebarContent>

            <SidebarRail />
        </Sidebar>
    )
}