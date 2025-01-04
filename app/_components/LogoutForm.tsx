"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  function handleSignOut() {
    signOut({ callbackUrl: "/" }); 
  }

  function goBack() {
    router.back();
  }

  return (
    <div className="flex gap-4 items-center justify-center">
      <button
        className="bg-rose-600 text-sm tracking-wide font-bold py-2 px-2 rounded-[.5rem] text-lightRose1"
        onClick={goBack}
      >
        Back
      </button>
      <button
        className="bg-rose-400 text-sm tracking-wide font-bold py-2 px-2 rounded-[.5rem] text-lightRose1"
        type="button"
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </div>
  );
}
