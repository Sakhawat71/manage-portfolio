import { BlogsTable } from '@/components/modules/dashboard/blog/BlogTable';
import { getBlogs } from '@/services/blog';
import Link from 'next/link';
import React from 'react';

const BlogsPage = async () => {

    const blogs = await getBlogs();

    return (
        <div>
            <div className="w-full bg-slate-300 shadow-sm px-4 py-3 flex items-center justify-between rounded-md border">
                <h2 className="text-lg md:text-xl font-semibold text-gray-800">
                    Manage Projects {blogs?.meta?.total}
                </h2>
                <Link
                    href="/"
                    className="text-sm md:text-base font-medium bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded transition-colors duration-200"
                >
                    Add New Project
                </Link>
            </div>

            <BlogsTable
                blogs={blogs?.data}
            // onEdit={(id) => updateProject(id)}
            // onDelete={(id) => handleDeleteProject(id)}
            />
        </div>
    );
};

export default BlogsPage;