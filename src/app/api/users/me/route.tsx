import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/utils/jwt"; 

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      throw new Error("Authorization header is missing");
    }

    const token = authHeader.split(" ")[1]; 


    const payload = await verifyJWT(token);
    if (!payload) {
      throw new Error("Invalid or expired token");
    }

    const userId = payload.userId; 

  
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
    });

    const safeUser = {
      ...user,
      password: undefined,
    };

    return NextResponse.json(safeUser);
  } catch (error: any) {
    console.warn("Error: Failed to get user from request", error.message);
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }
}
