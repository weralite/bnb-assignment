import { UserRegistrationData } from "@/types/user";
import { UserLoginData } from "@/types/user";
import { UserResetPasswordData } from "@/types/user";



export function userRegistrationValidator(
  data: UserRegistrationData
): [boolean, ErrorObject] {
  let errors: ErrorObject = {};
  if (!data.email) {
    errors.email = "Email is required";
  }
  if (!data.password) {
    errors.password = "Password is required";
  }
  if (!data.firstName) {
    errors.name = "First Name is required";
  }
  if (!data.lastName) {
    errors.name = "Last Name is required";
  }
  const hasErrors = Object.keys(errors).length !== 0;

  return [hasErrors, errors];
}

export function userLoginValidator(
  data: UserLoginData
): [boolean, ErrorObject] {
  let errors: ErrorObject = {};
  if (!data.email) {
    errors.email = "Email is required";
  }
  if (!data.password) {
    errors.password = "Password is required";
  }
  const hasErrors = Object.keys(errors).length !== 0;

  return [hasErrors, errors];
}

export function userResetPasswordValidator(
  data: UserResetPasswordData
): [boolean, ErrorObject] {
  let errors: ErrorObject = {};
  if (!data.email) {
    errors.email = "Email is required";
  }
  if (!data.newPassword) {
    errors.newPassword = "Password is required";
  }
  if (!data.uuid) {
    errors.uuid = "UUID missing or incorrect"
  }
  const hasErrors = Object.keys(errors).length !== 0;

  return [hasErrors, errors];
}
