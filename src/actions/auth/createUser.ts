import { UserRegistrationData } from "@/types/user";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

export async function createUser(formData: FormData): Promise<UserRegistrationData> {
    const url = new URL(`${BASE_URL}/api/auth/register`);

    
    const data: UserRegistrationData = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        isAdmin: formData.get("isAdmin") === "false",
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            console.error(`Error creating listing: Status ${response.status}`);
            throw new Error("Unable to create listing"); 
        }

        const createdUser: UserRegistrationData = await response.json();
        return createdUser;

    } catch (error: any) {
        console.warn("Error creating listing (action)", error);
        throw new Error("Unable to create listing");
    }
}
