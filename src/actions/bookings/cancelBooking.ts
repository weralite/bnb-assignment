import CookieKit from "@/utils/cookieKit";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function cancelBooking(id: string): Promise<boolean> {
    const url = new URL(`${BASE_URL}/api/bookings/cancel-booking/${id}`);  
    const token = CookieKit.get("token");

    if (!token) {
        console.warn("No authentication token found.");
        return false;
    }

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            },
        });

        if (!response.ok) {
            throw new Error("Unable to perform task")
        }

        return true;
    } catch (error: any) {
        console.warn("Error (action)", error);
        return false;
    }

}
