// import LoginForm from "@/app/_components/LoginForm";
import { SignUp } from "@clerk/nextjs";

export const metadata = {
  title: "Sign Up | Blews Stitches",
  description:
    "Sign Up to the Blews Stitches platform to access your account and manage your orders.",
};

export default function Page() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* <LoginForm /> */}
      <SignUp/>
    </div>
  );
}
