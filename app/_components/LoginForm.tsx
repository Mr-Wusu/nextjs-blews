import Socials from "@/app/_components/Socials";

function LoginForm() {
  return (
    <div className="w-max flex flex-col items-center gap-4">
      <form className="flex flex-col gap-4 py-4 rounded-md">
        <h1 className="tracking-wider text-2xl text-rose-700 uppercase font-semibold self-center mb-3">
          Login
        </h1>
        <input
          className="h-9 bg-white border-2 rounded px-2 w-[20rem] border-rose-500"
          type="text"
          placeholder="Email"
        />
        <input
          className="h-9 bg-white border-2 rounded px-2 border-rose-500"
          type="password"
          placeholder="Password"
        />
        <button
          className="bg-gradient-to-r from-rose-700 to-rose-400 hover:bg-gradient-to-r hover:from-rose-600 hover:to-rose-300 mt-2 w-[100px] text-lightRose1 py-1 tracking-wide rounded self-center transition-bg duration-300 ease-in-out"
          type="submit"
        >
          Login
        </button>
      </form>

      <div className="flex gap-2 items-center">
        <div className="h-[2px] bg-rose-500 w-20" />
        <h2 className="capitalize text-sm text-darkRose1">Or login in with</h2>
        <div className="h-[2px] bg-rose-500 w-20" />
      </div>

      <Socials />
    </div>
  );
}

export default LoginForm;
