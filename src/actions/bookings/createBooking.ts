import CookieKit from "@/utils/cookieKit";
import { toISODateTime } from "@/utils/dateConverter";
import { Booking } from "@prisma/client";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function createBooking(formData: FormData): Promise<Booking> {
    const url = new URL(`${BASE_URL}/api/bookings`);

    const token = CookieKit.get('token');

    if (!token) {
        console.warn("No authentication token found.");
        throw new Error("No authentication token found.");
    }
    
    const listingData = {
        totalPrice: parseFloat(formData.get("totalPrice")as string),
        listingId: formData.get("listingId"),
        checkInDate: toISODateTime(formData.get("checkInDate") as string),
        checkOutDate: toISODateTime(formData.get("checkOutDate") as string),
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(listingData),
        });

        if (!response.ok) {
            console.error(`Error creating listing: Status ${response.status}`);
            throw new Error(`Error creating listing: Status ${response.status}`);
        }

        const booking: Booking = await response.json();
        return booking;

    } catch (error: any) {
        console.warn("Error creating listing (action)", error);
        throw new Error("Error creating listing (action)");
    }
}
