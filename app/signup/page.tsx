"use client";


import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoIosClose } from "react-icons/io";
import Socials from "../_components/Socials";

export default function Page() {
  const [userCreated, setUserCreated] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
    return re.test(password);
  };

  const closePopup = () => {
    setUserCreated(false);
    router.push("/auth/signin");
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData(event.currentTarget);
      // Get form data
      const firstName = formData.get("firstName");
      const surname = formData.get("surname");
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const confirmPassword = formData.get("confirm");

      if (!validateEmail(email as string)) {
        return toast.error("Please enter a valid email address");
      }

      if (password !== confirmPassword) return toast("Passwords do not match");

      if (!validatePassword(password as string)) {
        return toast.error(
          "Password must be at least 8 characters long and include letters, digits, and a special character"
        );
      }

      const response = await fetch("api/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          surname,
          email,
          password,
        }),
      });

      if (response.status === 400) toast.error("User already exists. Login instead!");
      if (response.status === 201) {
        setUserCreated(true);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <div className="relative min-h-screen w-max flex flex-col items-center justify-center gap-4 mx-auto pb-6">
      {userCreated && (
        <div className="relative bg-white text-darkRose1  py-3 pl-3 pr-4 top-14 rounded-[.5rem] shadow-lg">
          <p>You have been registered successfully👌!</p>
          <button
            className="absolute right-[-12px] top-[-10px]"
            onClick={closePopup}
            type="button"
          >
            <IoIosClose className="text-2xl bg-rose-700 text-lightRose1 rounded-full" />
          </button>
        </div>
      )}
      <form
        className="relative flex flex-col gap-5 py-4 mt-7 rounded-md"
        onSubmit={handleSubmit}
      >
        <h1 className="tracking-wider text-2xl text-rose-700 uppercase font-semibold self-center">
          Sign Up
        </h1>
        <input
          className="h-9 bg-white border-2 rounded px-2 w-[20rem] border-rose-500"
          type="text"
          placeholder="Firstname"
          required
          name="firstName"
        />
        <input
          className="h-9 bg-white border-2 rounded px-2 w-[20rem] border-rose-500"
          type="text"
          placeholder="Surname"
          required
          name="surname"
        />
        <input
          className="h-9 bg-white border-2 rounded px-2 w-[20rem] border-rose-500"
          type="text"
          placeholder="Email"
          required
          name="email"
        />
        <input
          className="h-9 bg-white border-2 rounded px-2 border-rose-500"
          type="password"
          placeholder="Password"
          required
          name="password"
        />
        <input
          className="h-9 bg-white border-2 rounded px-2 border-rose-500"
          type="password"
          placeholder="Confirm Password"
          required
          name="confirm"
        />
        <button
          className="bg-gradient-to-r from-rose-700 to-rose-400 hover:bg-gradient-to-r hover:from-rose-600 hover:to-rose-300 active:scale-95 mt-2 w-[100px] text-lightRose1 py-1 tracking-wide rounded self-center transition-bg duration-300 ease-in-out"
          type="submit"
          disabled={submitting || userCreated}
        >
          Sign Up
        </button>
        {submitting && (
          <p className="absolute bottom-12 left-24 text-xs ">
            We are signing you up!
          </p>
        )}
        <p className="text-sm self-center text-darkRose1 pt-4">
          Already Registered?
          <span className="ml-1">
            <Link
              className="border-b border-rose-700 px-1 hover:text-rose-600 hover:border-rose-500 transition-all duration-300 ease-in"
              href="/auth/signin"
            >
              Login
            </Link>
          </span>
        </p>
      </form>
      <div className="flex gap-2 items-center">
        <div className="h-[2px] bg-rose-500 w-20" />
        <h2 className="capitalize text-sm text-darkRose1">Or login in with</h2>
        <div className="h-[2px] bg-rose-500 w-20" />
      </div>
      <Socials />
      <Toaster />
    </div>
  );
}
