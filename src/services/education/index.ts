"use server";

import { cookies } from "next/headers";

export const getAllEducations = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/educations`, {
            method: "GET",
            cache: "no-store",
        });
        if (!res.ok) {
            throw new Error("Failed to fetch educations");
        }
        return await res.json();
    } catch (error: any) {
        return Error(error);
    }
};


export const createEducation = async (payload: any) => {
    try {
        const token = (await cookies()).get("accessToken")?.value;
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/api/educations/create-education`,
            {
                method: "POST",
                headers: {
                    Authorization: token!,
                },
                body: payload,
            }
        );
        return await res.json();
    } catch (error: any) {
        return Error(error);
    }
}