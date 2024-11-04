import CookieKit from "@/utils/cookieKit";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function deleteListing(id: string): Promise<void> {
    const url = new URL(`${BASE_URL}/api/listings/${id}`);  
    const token = CookieKit.get("token");

    if (!token) {
        console.warn("No authentication token found.");
        return;
    }

    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error("Unable to perform task")
        }

        return;
    } catch (error: any) {
        console.warn("Error (action)", error);
        return;
    }

}
