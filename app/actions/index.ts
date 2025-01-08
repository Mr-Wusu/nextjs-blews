"use server";
import { signIn, signOut } from "@/auth";

export async function loginWithProvider(formData: FormData) {
  const action: string = formData.get("action") as string;
  // This function will be called when the user clicks on the login button
  await signIn(action, { redirectTo: "/" });
}

export async function logout() {
  await signOut({ redirect: true });
}
