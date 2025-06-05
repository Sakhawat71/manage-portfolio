"use server"

import { cookies } from "next/headers";

export const getBlogs = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/blogs`, {
            method: "GET",
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch blogs");
        }

        return await res.json();
    } catch (error) {
        console.log(error);
    }
};

export const createBlog = async (data: any) => {
    try {
        const token = (await cookies()).get("accessToken")?.value;
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };
        if (token) {
            headers["Authorization"] = token;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/blogs/create-blog`, {
            method: "POST",
            headers,
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            throw new Error("Failed to create blog");
        }

        return await res.json();
    } catch (error) {
        console.log(error);
    }
};