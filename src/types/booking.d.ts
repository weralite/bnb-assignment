import  { Booking } from "@prisma/client";


type BookingData = Omit<Booking, "id" | "status">;