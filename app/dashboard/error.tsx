"use client";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-red-800 px-4 gap-5">
      <h1>Eeyah! Something bad has happened!</h1>
      <p className="w-3/4">{error.message}</p>
      <button className="bg-rose-400 border border-rose-300 text-lightRose1 tracking-wide rounded-[.7rem] hover:bg-rose-300 hover:text-darkRose1 transition-all duration-700 px-2 py-1 shadow-sm shadow-black active:translate-x-3" onClick={reset}>Reset</button>
    </div>
  );
}
