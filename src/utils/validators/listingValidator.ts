import { ListingData } from "@/types/listing";
import { Listing } from "@prisma/client";


export default function listingValidator(data: ListingData | Listing, id?: string): [boolean, ErrorObject] {
  let errors: ErrorObject = {};
  if((data as Listing).id !== undefined) {
    if((data as Listing).id !== id) {
      errors.id = "Id missmatch"
    }
  }
  if (!data.title) {
    errors.title = "Title is required";
  }
  if (!data.description) {
    errors.description = "Description is required";
  }
  if (!data.address) {
    errors.address = "Address is required";
  }
  if (!data.country) {
    errors.country = "Country of birth is required";
  }
  if (!data.dailyRate) {
    errors.dailyRate = "Daily Rate of birth is required";
  }
  if (!data.availableBeds) {
    errors.availableBeds = "Available Beds of birth is required";
  }
  if (!data.availableFrom) {
    errors.availableFrom = "Available From of birth is required";
  }
  if (!data.availableTo) {
    errors.availableTo = "Available To of birth is required";
  }
  const hasErrors = Object.keys(errors).length !== 0;

  return [hasErrors, errors]
}
