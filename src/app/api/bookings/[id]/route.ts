import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { BookingData } from "@/types/booking";
import { Booking } from "@prisma/client";
import { acceptBooking } from "@/services/bookingService"; // Import the service

const prisma = new PrismaClient();

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
        const updatedBooking = await acceptBooking(bookingId, userId);

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

export async function DELETE(request: NextRequest, options: APIOptions): Promise<NextResponse> {
    const bookingId = options.params.id;
    const userId = request.headers.get("userId");
  
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
      const booking: BookingData | null = await prisma.booking.findUnique({
        where: { id: bookingId },
        include: {
          guest: {
            select: {
              id: true,
              isAdmin: true,
            },
          },
          listing: {
            include: {
              advertiser: {
                select: {
                  id: true,
                  isAdmin: true,
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
  

      const isUserAuthorized =
        userId === booking.guest.id ||
        userId === booking.listing.advertiser.id ||
        booking.guest.isAdmin ||
        booking.listing.advertiser.isAdmin;
  
      if (!isUserAuthorized) {
        return NextResponse.json(
          { message: "Unauthorized: User is not the guest or advertiser, and is not an admin" },
          { status: 403 }
        );
      }
  
      // Delete the booking
      await prisma.booking.delete({
        where: { id: bookingId },
      });
  
      return NextResponse.json(
        { message: "Booking successfully deleted." },
        { status: 200 }
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.warn("Error Deleting Booking: ", error.message);
      } else {
        console.warn("Error Deleting Booking: ", error);
      }
  
      return NextResponse.json(
        { message: "Error deleting booking." },
        { status: 500 }
      );
    }
  }



