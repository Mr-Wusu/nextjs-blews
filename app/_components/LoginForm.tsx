import { loginWithProvider } from "../actions"

function LoginForm() {
  return (
    <form className="h-min py-4 px-5 rounded-md bg-rose-700" action={loginWithProvider}>
      <button
        className="bg-slate-400 text-[#fff] rounded-md py-2 px-2"
        type="submit"
        name="action"
        value="google"
      >
        Sign in with Google
      </button>

      <button
        className="bg-[#8644f0] text-white rounded-md py-2 px-2"
        type="submit"
        name="action"
        value="facebook"
      >
        Sign in with Facebook
      </button>
    </form>
  );
}

export default LoginForm