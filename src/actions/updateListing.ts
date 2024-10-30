import CookieKit from "@/utils/cookieKit";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function updateListing(id: string, formData: FormData): Promise<void> {
    const url = new URL(`${BASE_URL}/api/listings/${id}`);

    const token = CookieKit.get('token');

    // Check if token exists
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
        availableFrom: formData.get("availableFrom"),
        availableTo: formData.get("availableTo"),
    };

    console.log("Listing Data:", listingData);

    try {
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(listingData),
        });

        if (!response.ok) {
            throw new Error("Unable to update listing");
        }

        const updatedListing = await response.json();
        console.log("Listing updated successfully:", updatedListing);

        return;
    } catch (error: any) {
        console.warn("Error updating listing (action)", error);
        return;
    }
}
