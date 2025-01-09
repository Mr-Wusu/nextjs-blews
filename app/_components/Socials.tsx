import { loginWithProvider } from "@/app/actions/index";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

export default function Socials() {
  return (
    <form
      className="h-min flex gap-4 py-4 px-5 rounded-md"
      action={loginWithProvider}
    >
      <button
        className="border-2 border-rose-500 text-rose-800 flex items-center justify-center pl-3 pr-5 py-1 rounded gap-3 bg-white hover:bg-gradient-to-r from-slate-300 to-slate-100 transition-all duration-300 ease-in-out"
        type="submit"
        name="action"
        value="google"
      >
        <FcGoogle className="text-[16px]" />
        <h2>Google</h2>
      </button>

      <button
        className="border-2 border-rose-500 text-rose-800 flex items-center justify-center pl-3 pr-5 rounded gap-3 bg-white hover:bg-gradient-to-r from-blue-300 to-blue-200 transition-all duration-300 ease-in-out"
        type="submit"
        name="action"
        value="facebook"
      >
        <FaFacebookF className="text-[16px] text-[#5a65c1]" />
        <h2>Facebook</h2>
      </button>
    </form>
  );
}
