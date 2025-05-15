"use client";

import { Button } from "./_components/Button";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-8 gap-3">
      <h1 className="text-darkRose1 text-2xl">Eeyah! Something bad has happened!</h1>
      <p className="lg:text-lg px-6">{error.message}</p>
      <Button onClick={reset}>Reset</Button>
    </div>
  );
}
