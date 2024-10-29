import  { User, Listing } from "@prisma/client";

type UserData = Omit<User, "id">;

type ListingData = Omit<Listing, "id"> & {
};

type ListingWithAdvertiser = Listing & {
  advertiser: User; 
};
