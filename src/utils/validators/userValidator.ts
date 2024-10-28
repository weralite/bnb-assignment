import { UserRegistrationData } from "@/types/user";

export function userRegistrationValidator(
  data: UserRegistrationData
): [boolean, ErrorObject] {
  let errors: ErrorObject = {};
  if (!data.email) {
    errors.email = "Email is required";
    //TODO: Add email validation
  }
  if (!data.password) {
    errors.password = "Password is required";
  }
  if (!data.firstName) {
    errors.name = "Name is required";
  }
  if (!data.lastName) {
    errors.name = "Name is required";
  }
  const hasErrors = Object.keys(errors).length !== 0;

  return [hasErrors, errors];
}

