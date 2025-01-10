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

export async function loginWithCredentials(formData: FormData) {
  try {
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

     if (response?.error) {
       throw new Error(response.error);
     }

    return response;

  } catch (error) {
     console.error("Error during login:", error);
     throw new Error(
       "Incorrect email or password 🙄!"
     );
  }
}
