"use server";

import { TEducationForm } from "@/types/education.type";
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


export const createEducation = async (payload: TEducationForm) => {
    try {
        const token = (await cookies()).get("accessToken")?.value;
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/educations/create-education`,
            {
                method: "POST",
                headers: {
                    Authorization: token!,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            }
        );
        return await res.json();
    } catch (error: any) {
        return Error(error);
    }
}