// actions/getListingById.ts
import  prisma  from "@/lib/prisma"; // Ensure you have the correct path to your Prisma client

export async function getListingById(id: string) {
  try {
    const listing = await prisma.listing.findUnique({
      where: { id },
    });
    return listing;
  } catch (error) {
    console.error("Error fetching listing by ID:", error);
    return null;
  }
}