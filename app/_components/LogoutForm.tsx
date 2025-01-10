"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast, {Toaster} from "react-hot-toast";

export default function Logout() {
  const router = useRouter();

  function handleSignOut() {
    signOut({ callbackUrl: "/" });
    toast("You have successfully signed out😒!") 
  }

  function goBack() {
    router.back();
  }

  return (
    <div className="flex gap-4 items-center justify-center">
      <button
        className="bg-gradient-to-r from-rose-700 to-rose-500 hover:bg-gradient-to-r hover:from-rose-600 hover:to-rose-400 border-2 border-rose-600 text-sm tracking-wider font-bold py-1 px-4 rounded-[.5rem] text-lightRose1"
        onClick={goBack}
      >
        Back
      </button>
      <button
        className="border-2 border-rose-600 text-sm tracking-wide font-bold py-1 px-2 rounded-[.5rem] text-rose-800 hover:bg-rose-100 transition-all duration-100 ease-in-out"
        type="button"
        onClick={handleSignOut}
      >
        Sign Out
      </button>
      <Toaster/>
    </div>
  );
}
