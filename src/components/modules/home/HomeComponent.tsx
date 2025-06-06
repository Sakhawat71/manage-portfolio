'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Globe, PenTool } from 'lucide-react';
import Link from 'next/link';

const links = [
    {
        title: 'Portfolio Site',
        href: 'https://sakhawat71.vercel.app/',
        icon: <Globe className="w-6 h-6 text-blue-600" />,
        description: 'Visit your personal portfolio website.',
    },
    {
        title: 'GitHub Profile',
        href: 'https://github.com/Sakhawat71',
        icon: <Github className="w-6 h-6 text-gray-800" />,
        description: 'Explore all your open-source code and projects.',
    },
    {
        title: 'LinkedIn',
        href: 'https://www.linkedin.com/in/s3h/',
        icon: <Linkedin className="w-6 h-6 text-blue-700" />,
        description: 'Connect professionally and share your dev journey.',
    },
    {
        title: 'Blog & CMS',
        href: '/dashboard/blogs',
        icon: <PenTool className="w-6 h-6 text-green-600" />,
        description: 'Manage your blogs, posts and writing content.',
    },
];

export default function HomeComponent() {
    return (
        <div className="min-h-screen p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
            
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {links.map((link) => (
                    <Card key={link.title} className="hover:shadow-lg transition">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center gap-4">
                                {link.icon}
                                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">{link.title}</h2>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{link.description}</p>
                            <Link href={link.href} target="_blank">
                                <Button size="sm" variant="outline">
                                    Visit
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
