import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { BookingData } from "@/types/booking";
import { Listing } from "@prisma/client";
import { User } from "@prisma/client";
import { verifyJWT } from "@/utils/jwt";

const prisma = new PrismaClient();

export async function GET(request: NextRequest): Promise<NextResponse> {
  const authHeader = request.headers.get("Authorization");
  let userId: string | null = null;

  if (authHeader) {
    try {
      const token = authHeader.split(" ")[1];
      const decodedToken = await verifyJWT(token);
      userId = decodedToken?.userId;
    } catch (error: any) {
      console.warn("Error decoding token:", error.message);
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      );
    }
  }

  if (!userId) {
    return NextResponse.json(
      { message: "Unauthorized: User not authenticated" },
      { status: 401 }
    );
  }

  try {
    const guestBookings = await prisma.booking.findMany({
      where: {
        guestId: userId,
      },
      include: {
        listing: {
          select: {
            id: true,
            title: true,
            imageUrl: true,
            advertiserId: true,
          },
        },
        guest: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    const advertiserListings = await prisma.listing.findMany({
      where: {
        advertiserId: userId,
      },
      include: {
        Booking: {
          include: {
            guest: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    // Conditional response based on user role (guest or advertiser)
    if (guestBookings.length > 0) {
      return NextResponse.json(
        { guestBookings },
        { status: 200 }
      );
    } else if (advertiserListings.length > 0) {
      return NextResponse.json(
        {
          advertiserBookings: advertiserListings.map(listing => ({
            listingId: listing.id,
            title: listing.title,
            imageUrl: listing.imageUrl,
            bookings: listing.Booking,
          })),
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "No bookings found." },
      { status: 404 }
    );

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.warn("Error Fetching Bookings: ", error.message);
    } else {
      console.warn("Error Fetching Bookings: ", error);
    }

    return NextResponse.json(
      { message: "Error retrieving booking details." },
      { status: 500 }
    );
  }
}


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
