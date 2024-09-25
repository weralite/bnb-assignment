// components/auth/LoginForm.tsx

import React from "react";

const LoginForm = () => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold">Login</h2>
      {/* Login form fields */}
      <form>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>

        <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
