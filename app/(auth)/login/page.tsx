"use client";

import { useSession } from "@/context/SessionContext";
import axios from "axios";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const { setSession } = useSession();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        values,
        { withCredentials: true }
      );
      localStorage.setItem('user', JSON.stringify(res.data.userData))
      setSession(res.data.userData);
      redirect("/");
    } catch (error) {}
  };

  return (
    <div>
      <h1 className="text-lg font-bold mb-6 text-center">Sign in</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className="p-2 rounded-sm border border-solid border-black block w-full outline-none"
            placeholder="Email"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            className="p-2 rounded-sm border border-solid border-black block w-full outline-none"
            placeholder="Password"
          />
        </div>
        <div className="grid">
          <button
            type="submit"
            className="p-2 rounded-sm bg-black text-white select-none text-sm font-semibold"
          >
            Sign in
          </button>
        </div>
        <div className="mt-8">
          <p>
            Don't have an account?{" "}
            <Link href={"/signup"} className="hover:underline font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
