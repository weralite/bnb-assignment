import { NextRequest, NextResponse } from "next/server";
import { rejectBooking } from "@/services/bookingService"; // Import the service
import { Booking } from "@prisma/client";


export async function PUT(request: NextRequest, options: APIOptions): Promise<NextResponse> {
  const bookingId = options.params.id;
  const userId = request.headers.get("userId");

  

    if (!bookingId || !userId) {
        return NextResponse.json(
            { message: "Booking ID and user ID are required" },
            { status: 400 }
        );
    }

    try {
        const updatedBooking = await rejectBooking(bookingId, userId);

        return NextResponse.json(updatedBooking, { status: 200 });
    } catch (error) {
        console.error("Error accepting booking:", error);
        const errorMessage = error instanceof Error ? error.message : "Failed to accept booking";
        return NextResponse.json(
            { message: errorMessage },
            { status: 400 }
        );
    }
}