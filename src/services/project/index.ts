"use server";

export const getAllProjects = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/projects`, {
            method: "GET",
            cache: "no-store",
        });
        if (!res.ok) {
            throw new Error("Failed to fetch projects");
        }
        return await res.json();
    } catch (error: any) {
        return Error(error);
    }
};
