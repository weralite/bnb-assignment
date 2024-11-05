import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { BookingData } from "@/types/booking";
import { Listing } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: NextRequest, options: APIOptions): Promise<NextResponse> {
    const userId = request.headers.get("userId");

    if (!userId) {
        return NextResponse.json(
            { message: "Unauthorized: User not authenticated" },
            { status: 401 }
        );
    }

    try {
        const body: BookingData = await request.json();

        const listing: Listing | null = await prisma.listing.findUnique({
            where: { id: body.listingId },
        });

        if (!listing) {
            return NextResponse.json(
                { message: "Listing not found" },
                { status: 404 }
            );
        }

        // Step 1: Create the booking
        const booking = await prisma.booking.create({
            data: {
                totalPrice: body.totalPrice,
                checkInDate: body.checkInDate,
                checkOutDate: body.checkOutDate,
                listing: {
                    connect: {
                        id: body.listingId,
                    },
                },
                guest: {
                    connect: {
                        id: userId
                    },
                },
            },
        });

        await prisma.listing.update({
            where: { id: body.listingId },
            data: {
                Booking: {
                    connect: { id: booking.id },
                },
            },
        });

        // Log the updated listing for verification
        const updatedListing = await prisma.listing.findUnique({
            where: { id: body.listingId },
            include: { Booking: true }, // Include bookings in the result
        });

        console.log("Updated Listing:", updatedListing);


        return NextResponse.json(booking, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.warn("Error Creating Booking: ", error.message);
        } else {
            console.warn("Error Creating Booking: ", error);
        }

        return NextResponse.json(
            {
                message: "A valid 'BookingData' object has to be sent",
            },
            {
                status: 400,
            }
        );
    }
}
