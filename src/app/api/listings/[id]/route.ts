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


export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { id, ...data } = body;

        if (!id) {
            return NextResponse.json(
                { message: "Listing ID is required." },
                { status: 400 }
            );
        }

        const updatedListing = await prisma.listing.update({
            where: { id },
            data,
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

        return NextResponse.json(updatedListing, { status: 200 });
    } catch (error: any) {
        console.warn("Error updating listing: ", error.message);
        return NextResponse.json(
            { message: "Error updating listing." },
            { status: 500 }
        );
    }
}


export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json(
                { message: "Listing ID is required." },
                { status: 400 }
            );
        }

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
