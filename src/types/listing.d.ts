import  { User, Listing } from "@prisma/client";

type UserData = Omit<User, "id">;

type ListingData = Omit<Listing, "id" | "advertiserId">;

type ListingWithAdvertiser = Listing & {
  advertiser: User; 
};

type ListingFormValues = Listing & {
  title: string;
  description: string;
  address: string;
  country: string;
  dailyRate: string;
  imageUrl: string;
  availableBeds: string;
  availableFrom: string;
  availableTo: string;
}


export { UserData, ListingData, ListingWithAdvertiser, Listing, ListingFormValues };