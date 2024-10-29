import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    const userId = request.headers.get("userId");

    console.log("Received userId:", userId);

    if (!userId) {
        return NextResponse.json(
            { message: "Unauthorized: User not authenticated" },
            { status: 401 }
        );
    }

    try {
        // Fetch listings where the advertiserId matches the userId
        const listings = await prisma.listing.findMany({
            where: { advertiserId: userId },
            include: {
                advertiser: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        isAdmin: true,
                    },
                },
            },
        });

        if (!listings || listings.length === 0) {
            return NextResponse.json(
                { message: "No listings found for this user." },
                { status: 404 }
            );
        }

        return NextResponse.json(listings, { status: 200 });
    } catch (error: any) {
        console.warn("Error fetching listings: ", error.message);
        return NextResponse.json(
            { message: "Error fetching listings." },
            { status: 500 }
        );
    }
}
