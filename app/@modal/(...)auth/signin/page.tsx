import LoginForm from "@/app/_components/LoginForm";
import ModalRoot from "@/app/_components/ModalRoot";


export default function SignIn() {
  return (
    <ModalRoot className="min-h-fit py-3 px-5 flex flex-col items-center justify-center rounded-[.7rem]">
      <LoginForm />
    </ModalRoot>
  );
}
