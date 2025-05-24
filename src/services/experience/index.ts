"use server";

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
