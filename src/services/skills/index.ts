"use server";

export const getAllSkills = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/skills`, {
            method: "GET",
            cache: "no-store",
        });
        if (!res.ok) {
            throw new Error("Failed to fetch skills");
        }
        return await res.json();
    } catch (error: any) {
        return Error(error);
    }
};
