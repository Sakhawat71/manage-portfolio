"use server";

import { TExperienceForm } from "@/types/experience.type";
import { cookies } from "next/headers";

export const getAllExperiences = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/experiences`, {
            method: "GET",
            cache: "no-store",
        });
        if (!res.ok) {
            throw new Error("Failed to fetch experiences");
        }
        return await res.json();
    } catch (error: any) {
        return Error(error);
    }
};


export const createExperience = async (payload: TExperienceForm) => {
    try {
        const token = (await cookies()).get("accessToken")?.value;
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/experiences/create-experience`,
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