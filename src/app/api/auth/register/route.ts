import { NextRequest, NextResponse } from "next/server";
import { UserRegistrationData } from "@/types/user";
import { userRegistrationValidator } from "@/utils/validators/userValidator";
import { hashPassword } from "@/utils/bcrypt";
import prisma from '@/lib/prisma';
import { signJWT } from "@/utils/jwt";

export async function POST(request: NextRequest) {
  try {
    const body: UserRegistrationData = await request.json();
    const [hasErrors, errors] = userRegistrationValidator(body);
    if (hasErrors) {
      return NextResponse.json(
        {
          errors,
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await hashPassword(body.password);
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        firstName: body.firstName,
        lastName: body.lastName,
      },
    });
    const token = await signJWT({
        userId: user.id,
    })

    return NextResponse.json(token, { status: 201 });
    } catch (e) {
    return NextResponse.json(
      {
        error: (e as Error).message,
      },
      {
        status: 500,
      }
    );  
    }
}

