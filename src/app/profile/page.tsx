/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState("nothing");
  const router = useRouter();
  const logout = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/users/logout");
      console.log("logout ", res.data);
      router.push("/login");
    } catch (error: any) {
      console.log("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const getUserDeatils = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/users/me");
      console.log("user details", res.data.data);
      setData(res.data.data.username);
    } catch (error: any) {
      console.log("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDeatils();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-2 text-black">
      <h1>Profile page</h1>
      <h2>user Name: {data}</h2>
      <br />
      <button
        className=" border p-3 border-gray-800 rounded-2xl"
        onClick={logout}
      >
        logout
      </button>
    </div>
  );
};

export default ProfilePage;
