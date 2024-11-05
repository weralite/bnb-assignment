import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { BookingData } from "@/types/booking";

const prisma = new PrismaClient();

export async function PUT(request: NextRequest, options: APIOptions): Promise<NextResponse> {
    const bookingId = options.params.id;
    const userId = request.headers.get("userId");
    console.log("userId: ", userId);

    if (!userId) {
        return NextResponse.json(
            { message: "Unauthorized: User not authenticated" },
            { status: 401 }
        );
    }

    if (!bookingId) {
        return NextResponse.json(
            { message: "Booking ID is required." },
            { status: 400 }
        );
    }

    try {
        const body: Partial<BookingData> = await request.json();

        // Find the booking and check if it exists
        const booking = await prisma.booking.findUnique({
            where: { id: bookingId },
            include: {
                guest: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        isAdmin: true,
                        email: true,
                    },
                },
                listing: {
                    include: {
                        advertiser: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                isAdmin: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });

        if (!booking) {
            return NextResponse.json(
                { message: "Booking not found." },
                { status: 404 }
            );
        }

        // Update the booking with new data from the request body
        const updatedBooking = await prisma.booking.update({
            where: { id: bookingId },
            data: {
                totalPrice: body.totalPrice ?? booking.totalPrice,
                checkInDate: body.checkInDate ?? booking.checkInDate,
                checkOutDate: body.checkOutDate ?? booking.checkOutDate,
                status: body.status ?? booking.status,
            },
            include: {
                guest: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        isAdmin: true,
                        email: true,
                    },
                },
                listing: {
                    include: {
                        advertiser: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                isAdmin: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });

        return NextResponse.json(updatedBooking, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.warn("Error Updating Booking: ", error.message);
        } else {
            console.warn("Error Updating Booking: ", error);
        }

        return NextResponse.json(
            { message: "Error updating booking details." },
            { status: 500 }
        );
    }
}
