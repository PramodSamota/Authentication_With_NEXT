"use client";

import Link from "next/link";
import { useState } from "react";

interface User {
  email: string;
  password: string;
}
const LoginPage = () => {
  const [user, setUser] = useState<User>({
    email: "",
    password: "",
  });

  const handlelogin = () => {};
  return (
    <div className="flex flex-col justify-center h-screen items-center p-4 text-black">
      <div className="flex gap-3 mb-4">
        <label htmlFor="email">email:</label>
        <input
          className="p-1 border border-gray-800 rounded-2xl ml-8"
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
          }}
        />
      </div>
      <div className="flex gap-3 mb-4">
        <label htmlFor="password">password</label>
        <input
          className="p-1 border border-gray-800 rounded-2xl"
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
        />
      </div>
      <button
        className="border  border-b-black rounded-2xl p-2 ml-10"
        onClick={handlelogin}
      >
        SignIn
      </button>
      <Link href="/singup">if user not ?singup</Link>
    </div>
  );
};

export default LoginPage;
