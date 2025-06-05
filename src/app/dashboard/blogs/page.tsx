import { getBlogs } from '@/services/blog';
import React from 'react';

const BlogsPage = async () => {

    const blogs = await getBlogs();
    console.log(blogs);

    return (
        <div>
            blogs {blogs?.meta?.total}
        </div>
    );
};

export default BlogsPage;