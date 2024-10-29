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
    errors.firstName = "First name is required";
  }
  if (!data.description) {
    errors.lastName = "Last name is required";
  }
  if (!data.address) {
    errors.dateOfBirth = "Date of birth is required";
  }
  if (!data.country) {
    errors.dateOfBirth = "Date of birth is required";
  }
  if (!data.dailyRate) {
    errors.dateOfBirth = "Date of birth is required";
  }
  if (!data.availableBeds) {
    errors.dateOfBirth = "Date of birth is required";
  }
  if (!data.availableFrom) {
    errors.dateOfBirth = "Date of birth is required";
  }
  if (!data.availableTo) {
    errors.dateOfBirth = "Date of birth is required";
  }
  const hasErrors = Object.keys(errors).length !== 0;

  return [hasErrors, errors]
}
