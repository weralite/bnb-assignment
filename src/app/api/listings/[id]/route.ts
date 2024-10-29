import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Listing } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
    try {
        // Extract the listing ID from the request's URL
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { message: "Listing ID is required." },
                { status: 400 }
            );
        }

        const listing: Listing | null = await prisma.listing.findUnique({
            where: { id },
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

        if (!listing) {
            return NextResponse.json(
                { message: "Listing not found." },
                { status: 404 }
            );
        }

        return NextResponse.json(listing, { status: 200 });
    } catch (error: any) {
        console.warn("Error retrieving listing: ", error.message);
        return NextResponse.json(
            { message: "Error retrieving listing." },
            { status: 500 }
        );
    }
}


export async function PUT(request: NextRequest, options: APIOptions) {
    const id = options.params.id;
    const userId = request.headers.get("userId");

    if (!userId) {
        return NextResponse.json(
            { message: "Unauthorized: User not authenticated" },
            { status: 401 }
        );
    }

    try {
        if (!id) {
            return NextResponse.json(
                { message: "Listing ID is required." },
                { status: 400 }
            );
        }

        // Parse the request body to get the updated listing data
        const { title, description, address, country, dailyRate, availableBeds, availableFrom, availableTo } = await request.json();

        // Fetch the listing to check the advertiserId
        const listing = await prisma.listing.findUnique({
            where: { id },
            select: { advertiserId: true }, // Only select the advertiserId
        });

        if (!listing) {
            return NextResponse.json(
                { message: "Listing not found." },
                { status: 404 }
            );
        }

        // Fetch the user details to check if the user is an admin
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { isAdmin: true }, // Select only the isAdmin field
        });

        // Check if the user is the advertiser or an admin
        if (listing.advertiserId !== userId && !(user && user.isAdmin)) {
            return NextResponse.json(
                { message: "Unauthorized: You do not have permission to update this listing." },
                { status: 403 }
            );
        }

        // Proceed to update the listing
        const updatedListing = await prisma.listing.update({
            where: { id },
            data: {
                title,
                description,
                address,
                country,
                dailyRate,
                availableBeds,
                availableFrom,
                availableTo,
            },
        });

        return NextResponse.json(
            { message: "Listing updated successfully.", listing: updatedListing },
            { status: 200 }
        );
    } catch (error: any) {
        console.warn("Error updating listing: ", error.message);
        return NextResponse.json(
            { message: "Error updating listing." },
            { status: 500 }
        );
    }
}


export async function DELETE(request: NextRequest, options: APIOptions) {
    const id = options.params.id;
    const userId = request.headers.get("userId");

    if (!userId) {
        return NextResponse.json(
            { message: "Unauthorized: User not authenticated" },
            { status: 401 }
        );
    }

    try {
        if (!id) {
            return NextResponse.json(
                { message: "Listing ID is required." },
                { status: 400 }
            );
        }

        // Fetch the listing to check the advertiserId
        const listing = await prisma.listing.findUnique({
            where: { id },
            select: { advertiserId: true }, // Only select the advertiserId
        });

        if (!listing) {
            return NextResponse.json(
                { message: "Listing not found." },
                { status: 404 }
            );
        }

        // Fetch the user details to check if the user is an admin
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { isAdmin: true }, // Select only the isAdmin field
        });

        // Check if the user is the advertiser or an admin
        if (listing.advertiserId !== userId && !(user && user.isAdmin)) {
            return NextResponse.json(
                { message: "Unauthorized: You do not have permission to delete this listing." },
                { status: 403 }
            );
        }

        // Proceed to delete the listing
        await prisma.listing.delete({
            where: { id },
        });

        return NextResponse.json(
            { message: "Listing deleted successfully." },
            { status: 200 }
        );
    } catch (error: any) {
        console.warn("Error deleting listing: ", error.message);
        return NextResponse.json(
            { message: "Error deleting listing." },
            { status: 500 }
        );
    }
}
