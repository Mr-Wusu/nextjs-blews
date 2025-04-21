// import LoginForm from "@/app/_components/LoginForm";
import { SignIn } from "@clerk/nextjs";

export const metadata = {
  title: "Sign in | Blews Stitches",
  description:
    "Sign in to the Blews Stitches platform to access your account and manage your orders.",
};

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-7">
      {/* <LoginForm /> */}
      <SignIn />
    </div>
  );
}
