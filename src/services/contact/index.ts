/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";

export const getAllContacts = async () => {
    try {
        const token = (await cookies()).get("accessToken")?.value;
        const headers: HeadersInit = {
            "Content-Type": "application/json",
        };
        if (token) {
            headers["Authorization"] = token;
        }
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/contact`, {
            method: "GET",
            headers,
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch blogs");
        }

        return await res.json();
    } catch (error: any) {
        return Error(error);
    }
};