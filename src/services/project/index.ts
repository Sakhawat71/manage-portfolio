"use server";

import { cookies } from "next/headers";

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

export const createProject = async (payload: any) => {
    try {
        const token = (await cookies()).get("accessToken")?.value;
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/api/projects/create-project`,
            {
                method: "POST",
                headers: {
                    Authorization: token!,
                },
                body: payload,
            }
        );

        if (!res.ok) {
            throw new Error("Failed to create project");
        }

        return await res.json();
    } catch (error) {
        console.error("Add project error:", error);
        throw error;
    }
};


// export const createProject = async (formData: FormData) => {
//     try {
//         const token = (await cookies())?.get("accessToken")?.value;

//         const headers: Record<string, string> = {};
//         if (token) headers["Authorization"] = token;

//         const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/api/projects/create-project`, {
//             method: "POST",
//             headers,
//             body: formData,
//         });

//         if (!res.ok) {
//             throw new Error("Failed to create project");
//         }

//         return await res.json();
//     } catch (error) {
//         console.error("Add project error:", error);
//         throw error;
//     }
// };
