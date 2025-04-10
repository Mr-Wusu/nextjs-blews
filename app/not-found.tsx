"use client";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  function handleClick() {
    router.back();
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1>404 - Page Not Found</h1>
      <button
        className="border-2 h-fit leading-none border-rose-500 rounded-[.3rem] px-3 py-[6px] flex hover:bg-gradient-to-l hover:from-rose-400 hover:to-rose-100 transition-all duration-300 ease-linear tracking-wide"
        onClick={handleClick}
      >
        &larr; Back
      </button>
    </div>
  );
}
