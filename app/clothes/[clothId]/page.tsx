import Link from "next/link";

interface ClothIdProps {
  clothId: string;
}

export default function ClothId({ clothId }: ClothIdProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1>You are viewing the page for cloth with id: {clothId}</h1>
      <Link href={`/clothes/${clothId}/checkout`}>Checkout</Link>
    </div>
  );
}
