import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const listings = await prisma.listing.findMany();
  return NextResponse.json(listings);
}

export async function POST(req: Request) {
  const { 
    title, 
    description, 
    address, 
    country,
    dailyRate,
    availableBeds,
    availableFrom,
    availableTo} = await req.json();

  const listing = await prisma.listing.create({
    data: {    title, 
        description, 
        address, 
        country,
        dailyRate,
        availableBeds,
        availableFrom,
        availableTo }
  });

  return NextResponse.json(listing, { status: 201 });
}

export async function PUT(req: Request) {
  const { id, title, description, address, country, dailyRate, availableBeds, availableFrom, availableTo } = await req.json();

  const listing = await prisma.listing.update({
    where: { id },
    data: { title, description, address, country, dailyRate, availableBeds, availableFrom, availableTo }
  });

  return NextResponse.json(listing);
}


export async function DELETE(req: Request) {
  const { id } = await req.json();

  await prisma.listing.delete({ where: { id } });

  return NextResponse.json({ message: 'Listing deleted' });
}
