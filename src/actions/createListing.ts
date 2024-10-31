import CookieKit from "@/utils/cookieKit";
import { toISODateTime } from "@/utils/dateConverter";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function createListing(formData: FormData): Promise<void> {
    const url = new URL(`${BASE_URL}/api/listings`);

    const token = CookieKit.get('token'); 

    if (!token) {
        console.warn("No authentication token found.");
        return;
    }
    const listingData = {
        title: formData.get("title"),
        description: formData.get("description"),
        address: formData.get("address"),
        country: formData.get("country"),
        imageUrl: formData.get("imageUrl"),
        dailyRate: parseFloat(formData.get("dailyRate") as string), 
        availableBeds: parseInt(formData.get("availableBeds") as string, 10), 
        availableFrom: toISODateTime(formData.get("availableFrom") as string),
        availableTo: toISODateTime(formData.get("availableTo") as string),
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
            throw new Error("Unable to create listing");
        }

        const createdListing = await response.json();

        return;
    } catch (error: any) {
        console.warn("Error creating listing (action)", error);
        return;
    }
}
