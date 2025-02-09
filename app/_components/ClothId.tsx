"use client";
import { useRouter } from "next/navigation";

export default function ClothId({ slug }: { slug: string }) {
  const router = useRouter();
  function handleClick() {
    router.back();
  }

  return (
    <div>
      <h1>Cloth Id: {slug}</h1>
      <button onClick={handleClick}>Back</button>
    </div>
  );
}
