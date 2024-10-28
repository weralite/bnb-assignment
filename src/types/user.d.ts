import { User } from "@prisma/client";

type UserRegistrationData = Omit<User, "id" | "createdAt" | "updatedAt">;

type UserLoginData = Omit<User, "id" | "createdAt" | "updatedAt" | "name">;

type UserResetPasswordData = {
  email: string;
  newPassword: string;
  uuid: string
}

type SafeUser = Omit<User,"password" | "passwordResetUUID">
