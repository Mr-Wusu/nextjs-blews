"use server"
import { signIn, signOut } from "@/auth";


export async function loginWithProvider (formData) {
  const action: string = formData.get("action");
  // This function will be called when the user clicks on the login button
  await signIn(action, { redirectTo: "/" });
}

export async function logout () {
  await signOut({callbackUrl: "/"});
}