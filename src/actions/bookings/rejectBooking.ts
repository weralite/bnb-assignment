import CookieKit from "@/utils/cookieKit";
import { Booking } from "@prisma/client";
import { th } from "date-fns/locale";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function rejectBooking(id: string): Promise<Booking> {
    const url = new URL(`${BASE_URL}/api/bookings/reject-booking/${id}`);  
    const token = CookieKit.get("token");

    if (!token) {
        console.warn("No authentication token found.");
        throw new Error("No authentication token found.");
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

        return await response.json();
    } catch (error: any) {
        console.warn("Error (action)", error);
        throw new Error(error.message);
    }

}
