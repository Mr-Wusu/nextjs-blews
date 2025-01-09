import Logout from "@/app/_components/LogoutForm";

export default function Signout() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-2 px-4 bg-lightRose1 text-darkRose2 gap-5">
      <h1 className="text-2xl font-bold text-rose-800">
        Are you sure about signing out?
      </h1>
      <Logout />
    </div>
  );
}
