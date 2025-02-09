"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { Button } from "./Button";

export default function Logout() {
  const router = useRouter();

  function handleSignOut() {
    signOut({ callbackUrl: "/" });
    toast("You have successfully signed out😒!");
  }

  function goBack() {
    router.back();
  }

  return (
    <div className="flex gap-4 items-center justify-center">
      <Button className="px-4" onClick={goBack} type="button">
        Back
      </Button>
      <Button className="px-2" onClick={handleSignOut} type="button">
        Sign Out
      </Button>
      <Toaster />
    </div>
  );
}
