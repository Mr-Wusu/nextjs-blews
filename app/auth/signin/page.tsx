import LoginForm from "@/app/_components/LoginForm";

export const metadata = {
  title: "Sign in | Blews Stitches",
  description:
    "Sign in to the Blews Stitches platform to access your account and manage your orders.",
};

export default function SignIn() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <LoginForm />
    </div>
  );
}
