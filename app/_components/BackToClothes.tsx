"use client"
import { useRouter } from "next/navigation"
import { Button } from "./Button"

export default function BackToClothes() {
  const router = useRouter()
  function backToClothesHandle() {
    router.back()
  }
  return (
    <Button className="w-fit p-2" onClick={backToClothesHandle}>
      Back to clothes
    </Button>
  );
}
