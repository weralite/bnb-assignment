import { PrismaClient, Booking, Listing } from "@prisma/client";

const prisma = new PrismaClient();

enum BookingStatus {
    Pending = "Pending",
    Confirmed = "Confirmed",
    Canceled = "Canceled"
  }

export async function acceptBooking(
    bookingId: string,
    userId: string
): Promise<Booking> {
    try {
        const booking: Booking & { listing: Listing } | null = await prisma.booking.findUnique({
            where: { id: bookingId },
            include: { listing: true },
        });

        if (!booking) {
            const errorMessage = `Booking with ID ${bookingId} not found`;
            console.error(errorMessage);
            throw new Error(errorMessage);
        }

        if (booking.status === BookingStatus.Confirmed) {
            const errorMessage = `Booking ${bookingId} is already confirmed`;
            console.error(errorMessage);
            throw new Error(errorMessage);
        }

        if (booking.listing.advertiserId !== userId) {
            const errorMessage = `User ${userId} is not authorized to confirm this booking (Listing advertiserId: ${booking.listing.advertiserId})`;
            console.error(errorMessage);
            throw new Error(errorMessage);
        }

        const updatedBooking: Booking = await prisma.booking.update({
            where: { id: bookingId },
            data: { status: BookingStatus.Confirmed },
        });

        console.log(`Booking ${bookingId} successfully confirmed`);
        return updatedBooking;

    } catch (error) {
        if (error instanceof Error) {
            console.error("Error in acceptBooking function:", error.message);
            console.error("Error Stack:", error.stack);
        } else {
            console.error("Unexpected error occurred while accepting booking:", error);
        }

        throw new Error("Failed to accept booking: " + (error instanceof Error ? error.message : "Unknown error"));
    }
}


export async function cancelBooking(
    bookingId: string,
    userId: string
  ): Promise<Booking> {
    const booking: Booking & { listing: Listing } | null = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { listing: true },
    });
  
    if (!booking) {
      throw new Error("Booking not found");
    }
  
    if (booking.status === BookingStatus.Confirmed) {
      throw new Error("Booking is already confirmed");
    }
  
    if (booking.status === BookingStatus.Canceled) {
      throw new Error("Booking is already canceled");
    }
  
    if (booking.listing.advertiserId !== userId) {
      throw new Error("Unauthorized: Only the advertiser can deny the booking");
    }
  
    // Update the booking status to Denied
    const updatedBooking: Booking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: BookingStatus.Canceled },
    });
  
    return updatedBooking;
  }