import { NextRequest, NextResponse } from "next/server";


import { PrismaClient } from "@prisma/client";
import { ListingWithAdvertiser } from "@/types/listing";
import listingValidator from "@/utils/validators/listingValidator";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const userId = request.headers.get("userId");

    console.log("userId: ", userId);

    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized: User not authenticated" },
        { status: 401 }
      );
    }
    try {
        const body: ListingWithAdvertiser = await request.json();
        const [hasErrors, errors] = listingValidator(body);
        if (hasErrors) {
            return NextResponse.json(
                {
                    errors,
                },
                { status: 400 }
            );
        }
        const listing = await prisma.listing.create({
            data: {
                title: body.title,
                description: body.description,
                address: body.address,
                country: body.country,
                dailyRate: body.dailyRate,
                availableBeds: body.availableBeds,
                availableFrom: body.availableFrom,
                availableTo: body.availableTo,
                advertiser: {
                    connect: {
                        id: userId,
                    },
                },
            },
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
        return NextResponse.json(listing, { status: 201 });
    } catch (error: any) {
        console.warn("Error Listing Object: ", error.message);
        return NextResponse.json(
            {
                message: "A valid 'ListingData' object has to be sent",
            },
            {
                status: 400,
            }
        );
    }
}


// Get request to get all listings

export async function GET() {
    try {
        const listings = await prisma.listing.findMany({
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
        return NextResponse.json(listings, { status: 200 });
    } catch (error: any) {
        console.warn("Error Listing Object: ", error.message);
        return NextResponse.json(
            {
                message: "A valid 'ListingData' object has to be sent",
            },
            {
                status: 400,
            }
        );
    }
}
