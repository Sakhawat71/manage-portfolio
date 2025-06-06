'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, Book, Briefcase, GraduationCap, Code2, MessageSquareText, BadgeCheck } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getStatistics } from '@/services/auth';

const icons = {
    blogCount: <Book className="w-6 h-6 text-blue-600" />,
    messageCount: <MessageSquareText className="w-6 h-6 text-indigo-500" />,
    educationCount: <GraduationCap className="w-6 h-6 text-orange-500" />,
    experienceCount: <Briefcase className="w-6 h-6 text-purple-500" />,
    projectCount: <Code2 className="w-6 h-6 text-green-600" />,
    skillCount: <BadgeCheck className="w-6 h-6 text-pink-500" />,
};

const routeMap: Record<string, string> = {
    blogCount: '/dashboard/blogs',
    messageCount: '/dashboard/messages',
    educationCount: '/dashboard/educations',
    experienceCount: '/dashboard/experiences',
    projectCount: '/dashboard/projects',
    skillCount: '/dashboard/skills',
};

export default function DashboardComponent() {
    const [stats, setStats] = useState<Record<string, number> | null>(null);
    const [loading, setLoading] = useState(true);

    // console.log(stats);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const statsData = await getStatistics();
                setStats(statsData.data);
            } catch (error) {
                console.error('Failed to fetch statistics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);


    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Loader2 className="animate-spin w-8 h-8 text-muted-foreground" />
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {stats &&
                    Object.entries(stats).map(([key, value]) => (
                        <Link href={routeMap[key]} key={key}>
                            <Card className="hover:shadow-lg transition cursor-pointer">
                                <CardContent className="p-6 space-y-3">
                                    <div className="flex items-center gap-4">
                                        {icons[key as keyof typeof icons]}
                                        <div>
                                            <p className="text-lg font-semibold capitalize">{key.replace('Count', '')}</p>
                                            <p className="text-2xl font-bold">{value}</p>
                                        </div>
                                    </div>
                                    <Button size="sm" variant="outline">
                                        Manage
                                    </Button>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
            </div>
        </div>
    );
}
