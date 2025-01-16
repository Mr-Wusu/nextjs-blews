import User from "@/models/user";

interface IUser {
  firstName: string;
  surname: string;
  email: string;
  password: string;
}

export async function createUser(user: IUser): Promise<void> {
  try {
    await User.create(user);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}