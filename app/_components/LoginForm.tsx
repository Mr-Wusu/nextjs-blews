import { loginWithProvider } from "../actions";

function LoginForm() {
  return (
    <form
      className="h-min flex flex-col gap-4 py-4 px-5 rounded-md"
      action={loginWithProvider}
    >
      <button
        className="bg-slate-400 hover:bg-[#b3c1d4] text-[#fff] rounded-[.5rem] py-2 px-2 transition-all duration-300"
        type="submit"
        name="action"
        value="google"
      >
        Sign in with Google
      </button>

      <button
        className="bg-[#8644f0] hover:bg-[#ad86ed] rounded-[.5rem] text-white py-2 px-2 transition-all duration-300"
        type="submit"
        name="action"
        value="facebook"
      >
        Sign in with Facebook
      </button>
    </form>
  );
}

export default LoginForm;
