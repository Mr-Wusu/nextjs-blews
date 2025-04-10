"use client";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  function handleClick() {
    router.back();
  }
  return (
    <div className="center_page">
      <h1>Oops! You are trying to be smart abi 😢!</h1>
      <button
        className="border-2 h-fit leading-none border-rose-500 rounded-[.3rem] px-3 py-[6px] flex hover:bg-gradient-to-l hover:from-rose-400 hover:to-rose-100 transition-all duration-300 ease-linear tracking-wide"
        onClick={handleClick}
      >
        &larr; Back
      </button>
    </div>
  );
}
