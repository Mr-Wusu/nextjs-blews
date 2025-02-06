"use client";
import Socials from "@/app/_components/Socials";
import { loginWithCredentials } from "@/app/actions/index";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { getSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useHomePage } from "@/contexts/HomePageContext";
import Link from "next/link";

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { setIsHomePage } = useHomePage();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const pathname = usePathname();
   const searchParams = useSearchParams();
   const callbackUrl = searchParams.get("callbackUrl") || "/";

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setIsLoading(true);
      const formData = new FormData(event.currentTarget);
      console.log(formData);
      const response = await loginWithCredentials(formData);

      if (response === false) {
        toast.error("User not found! 😕 Sign Up!", {
          duration: 4000,
          position: "bottom-right",
        });
        router.push("/signup");
        return;
      }

      if (!response.error) {
        await getSession();
        router.push(callbackUrl);
        toast.success("Signed in successfully👌!");

        // Clear form data
        if (formRef.current) {
          formRef.current.reset();
        }
      } else {
        toast.error(response.error, {
          duration: 4000,
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (pathname === "/") {
      setIsHomePage(true);
    }
  }, [pathname, setIsHomePage]);

  return (
    <div className="relative w-max flex flex-col items-center gap-4">
      <form
        ref={formRef}
        className="flex flex-col gap-5 py-4 rounded-md"
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
          required
        />
        <input
          className="h-9 bg-white border-2 rounded px-2 border-rose-500"
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="off"
          required
        />
        <button
          className="bg-gradient-to-r from-rose-700 to-rose-400 hover:bg-gradient-to-r hover:from-rose-600 hover:to-rose-300 active:scale-95 mt-2 w-[100px] text-lightRose1 py-1 tracking-wide rounded self-center transition-bg duration-300 ease-in-out"
          type="submit"
        >
          Login
        </button>
        <p className="text-sm self-center text-darkRose1 pt-1">
          Not registered yet?
          <span className="ml-1">
            <Link
              className="border-b border-rose-700 px-1 hover:text-rose-600 hover:border-rose-500 transition-all duration-300 ease-in"
              href="/signup"
            >
              Sign up
            </Link>
          </span>
        </p>
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
