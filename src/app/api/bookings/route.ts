import { NextRequest, NextResponse } from "next/server";


import { PrismaClient } from "@prisma/client";
import { BookingData } from "@/types/booking";
import listingValidator from "@/utils/validators/listingValidator";
import { verifyJWT } from "@/utils/jwt";

const prisma = new PrismaClient();


export async function POST(request: NextRequest, options: APIOptions) {
    const userId = request.headers.get("userId");

    if (!userId) {
        return NextResponse.json(
            { message: "Unauthorized: User not authenticated" },
            { status: 401 }
        );
    }

    try {
        const body: BookingData = await request.json();

        const listing = await prisma.listing.findUnique({
            where: { id: body.listingId },
        
        });
        
        if (!listing) {
            return NextResponse.json(
                { message: "Listing not found" },
                { status: 404 }
            );
        }


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
        return NextResponse.json(booking, { status: 200 });
    } catch (error: any) {
        console.warn("Error Creating Booking: ", error.message);
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