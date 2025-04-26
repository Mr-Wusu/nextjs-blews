import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl text-rose-800">Unauthorized Access</h1>
      <p className="text-darkRose2">
        You do not have permission to access this page.
      </p>
      <Link href="/" className="mt-4 text-rose-600 underline">
        Return to Home
      </Link>
    </div>
  );
}
