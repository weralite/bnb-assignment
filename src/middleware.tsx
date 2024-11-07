import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "./utils/jwt";

const UNSAFE_METHODS = ["POST", "PUT", "PATCH", "DELETE"];
const UNSAFE_REQUESTS = ["/api/users/me"];

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  if (
    UNSAFE_METHODS.includes(request.method) ||
    UNSAFE_REQUESTS.includes(url.pathname)
  ) {
    try {
      const Authorization = request.headers.get("Authorization");
      if (!Authorization) {
        throw new Error("No authorization header");
      }
      const token = Authorization.split(" ")?.[1] || null;
      if (!token) {
        throw new Error("No token");
      }
      const decryptedToken = await verifyJWT(token);
      if (!decryptedToken) {
        throw new Error("No token payload");
      }
      const headers = new Headers(request.headers);
      headers.set("userId", decryptedToken.userId);
      return NextResponse.next({
        headers,
      });
    } catch (error: any) {
      return NextResponse.json(
        {
          message: "Unauthenticated",
        },
        { status: 401 }
      );
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/api/bookings/",
    "/api/bookings/:id*",
    "/api/bookings/accept-booking/:id*",
    "/api/bookings/cancel-booking/:id*",
    "/api/listings/",
    "/api/listings/:id*",
    "/api/users/me",
    "/api/users/:id*",
  ],
};
