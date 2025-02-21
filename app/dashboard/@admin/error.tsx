"use client"; 
import { useEffect} from "react";
import { Button } from "@/app/_components/Button";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.log("error", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col gap-2">
        <h1>Oops! Something went wrong 😢!</h1>
        <p>{error.message}</p>
      </div>      
      <Button type="button" onClick={reset}>Reset</Button>
    </div>
  );
}