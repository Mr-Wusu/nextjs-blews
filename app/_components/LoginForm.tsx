"use client";
import Socials from "@/app/_components/Socials";
import { loginWithCredentials } from "@/app/actions/index";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsLoading(true);
      const formData = new FormData(event.currentTarget);
      const response = await loginWithCredentials(formData);
      if (!response.error) {
        await getSession();
        router.push("/");
        toast.success("Signed in successfully👌!");
      } else {
        toast.error(response.error);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (router.pathname === "/") {
      setIsHomePage(true);
    }
  }, [router.pathname]);

  return (
    <div className="relative w-max flex flex-col items-center gap-4">
      <form
        className="flex flex-col gap-4 py-4 rounded-md"
        onSubmit={handleFormSubmit}
      >
        <h1 className="tracking-wider text-2xl text-rose-700 uppercase font-semibold self-center mb-3">
          Login
        </h1>
        <input
          className="h-9 bg-white border-2 rounded px-2 w-[20rem] border-rose-500"
          type="text"
          name="email"
          placeholder="Email"
        />
        <input
          className="h-9 bg-white border-2 rounded px-2 border-rose-500"
          type="password"
          name="password"
          placeholder="Password"
        />
        <button
          className="bg-gradient-to-r from-rose-700 to-rose-400 hover:bg-gradient-to-r hover:from-rose-600 hover:to-rose-300 active:scale-95 mt-2 w-[100px] text-lightRose1 py-1 tracking-wide rounded self-center transition-bg duration-300 ease-in-out"
          type="submit"
        >
          Login
        </button>
        {isLoading && (
          <div className="text-xs absolute bottom-28 left-[140px]">
            Loading ...
          </div>
        )}
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

export default LoginForm;
