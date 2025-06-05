"use client"

import { AppSidebar } from "@/components/modules/dashboard/app-sidebar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Extract the current section from URL
    const getCurrentSection = () => {
        const segments = pathname.split('/').filter(Boolean);
        return segments.length > 1 ? segments[1] : 'dashboard';
    };

    // Format the path for display
    const formatPath = (path: string) => {
        return path
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <SidebarProvider className="bg-slate-50">
            <AppSidebar />
            <SidebarInset>
                {/* Enhanced Header */}
                <header className="sticky top-0 z-10 border-b bg-slate-100 backdrop-blur-sm">
                    <div className="flex h-16 items-center justify-between px-6">
                        <div className="flex items-center gap-4">
                            <SidebarTrigger className="text-slate-600 hover:text-slate-900" />

                            {/* Breadcrumb Navigation */}
                            <nav className="flex items-center space-x-2 text-sm">
                                <span className="font-medium text-slate-500">Dashboard</span>
                                <ChevronRight className="h-4 w-4 text-slate-400" />
                                <span className="font-medium text-slate-700 capitalize">
                                    {getCurrentSection()}
                                </span>
                                {pathname.split('/').length > 3 && (
                                    <>
                                        <ChevronRight className="h-4 w-4 text-slate-400" />
                                        <span className="font-semibold text-slate-900">
                                            {formatPath(pathname.split('/').pop()!)}
                                        </span>
                                    </>
                                )}
                            </nav>
                        </div>

                    </div>
                </header>

                {/* Content Area */}
                <main className={cn(
                    "min-h-[calc(100vh-4rem)] px-2 py-0 bg-slate-100",
                    "transition-all duration-300 ease-in-out"
                )}>
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
};