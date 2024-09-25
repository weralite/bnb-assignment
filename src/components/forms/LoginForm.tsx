// components/auth/LoginForm.tsx

import React from "react";

const LoginForm = () => {
  return (
    <div className="flex flex-col">
      <h2 className="py-4 text-lg font-semibold border-b text-center">Sign in</h2>




      <form className="flex flex-col w-full max-w-lg mx-auto px-10 pb-10 gap-5">
        <div className="flex flex-col">
          <h3 className="text-2xl font-semibold py-5">Welcome to Taskbnb</h3>
          <div className="border border-gray-300 rounded-lg p-2 flex flex-col space-y-2">
            <input
              type="text"
              name="email"
              placeholder="Email"
              className="border-b p-2"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="border-none rounded-lg p-2"
            />
          </div>
        </div>
        <button type="submit" className="w-full py-3 bg-[#ff5a5f] text-white rounded-md">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
