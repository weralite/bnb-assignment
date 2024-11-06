import { BookingResponse } from "@/types/booking";
import CookieKit from "@/utils/cookieKit";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function getBookings(): Promise<BookingResponse> {
    const url = new URL(`${BASE_URL}/api/bookings`);
    const token = CookieKit.get('token');

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Unable to fetch bookings");
        }

        const bookings: BookingResponse = await response.json();
        return bookings;
    } catch (error: any) {
        console.warn("Error fetching bookings (action)", error);
        return { guestBookings: [], advertiserBookings: [] }; // Return empty arrays on failure
    }
}
