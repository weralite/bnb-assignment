import { NextRequest, NextResponse } from "next/server";


import { PrismaClient } from "@prisma/client";
import { ListingData } from "@/types/listing";
import listingValidator from "@/utils/validators/listingValidator";
import { verifyJWT } from "@/utils/jwt";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const userId = request.headers.get("userId");


  if (!userId) {
    return NextResponse.json(
      { message: "Unauthorized: User not authenticated" },
      { status: 401 }
    );
  }
  try {
    const body: ListingData = await request.json();
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
        imageUrl: body.imageUrl,
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

export async function GET(request: NextRequest) {
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

  try {
    let listings;

    if (userId) {
      listings = await prisma.listing.findMany({
        where: { advertiserId: userId },
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
    } else {
      listings = await prisma.listing.findMany({
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
    }

    return NextResponse.json(listings, { status: 200 });
  } catch (error: any) {
    console.warn("Error fetching listings:", error.message);
    return NextResponse.json(
      { message: "An error occurred while fetching listings" },
      { status: 500 }
    );
  }
}