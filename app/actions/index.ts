"use server";
import { signIn, signOut } from "@/auth";
import User from "@/models/user";
import connectToDB from "@/settings/database";

export async function loginWithProvider(formData: FormData) {
  const action: string = formData.get("action") as string;
  // This function will be called when the user clicks on the login button
  await signIn(action, { redirectTo: "/" });
}

export async function loginWithCredentials(formData: FormData) {
  const user = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    await connectToDB();
    const isFound = await User.findOne({ email: user.email });
    if (!isFound) {
      console.log("User not found!");
      return false;
    }
    console.log("User found!");
    const response = await signIn("credentials", {
      email: user.email,
      password: user.password,
      callbackUrl: "/",
      redirect: false,
    });

    if (response?.error) {
      throw new Error(response.error);
    }

    return response;
  } catch (error) {
    console.error("Error during login:", error);
    throw new Error("Incorrect email or password 🙄!");
  }
}

export async function logout() {
  await signOut({ redirect: true });
}
