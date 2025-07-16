"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
const SignUpPage = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleSignUp = async () => {
    try {
      if (!user.username || !user.email || !user.password) {
        alert("Please fill in all the fields");
        return;
      }
      console.log("user", user);
      setLoading(true);
      const res = await axios.post("/api/users/signup", user);
      console.log("signUp success", res.data);
      router.push("/login");
    } catch (error: any) {
      console.log("signUp Failed", error.message);
      alert("Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center h-screen items-center p-4 text-black">
      <div className="flex gap-4 mb-4">
        <label htmlFor="username">username:</label>
        <input
          className="p-1 border border-gray-800 rounded-2xl"
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => {
            setUser({ ...user, username: e.target.value });
          }}
        />
      </div>
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
        onClick={handleSignUp}
        disabled={loading}
      >
        SignUp
      </button>
      <Link href="/login">if already user?login</Link>
    </div>
  );
};

export default SignUpPage;
