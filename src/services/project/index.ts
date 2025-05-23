"use server";

export const getAllProjects = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/project`, {
        method: "GET",
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error("Failed to fetch projects");
    }

};
