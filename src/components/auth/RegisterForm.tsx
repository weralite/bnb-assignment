// components/auth/LoginForm.tsx
import { createUser } from "@/actions/auth/createUser";
import React from "react";

interface LoginFormProps {
  onClose: () => void;
}


const RegisterForm: React.FC<LoginFormProps> = ({ onClose }) => {

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    try {
      await createUser(formData);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col">
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-lg mx-auto px-10 pb-10 gap-5">
        <div className="flex flex-col">
          <h3 className="text-2xl font-semibold py-5">Welcome to Taskbnb</h3>
          <div className="border border-gray-300 rounded-lg p-2 flex flex-col space-y-2">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="border-b p-2 focus:outline-none"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="border-b p-2 focus:outline-none"
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="border-b p-2 focus:outline-none"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border-none rounded-lg p-2 focus:outline-none"
            />
          </div>
        </div>
        <button type="submit" className="w-full py-3 bg-[#ff5a5f] text-white rounded-md">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
