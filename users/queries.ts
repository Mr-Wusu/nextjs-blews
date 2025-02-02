import User from "@/models/user";

interface IUser {
  firstName: string;
  surname: string;
  email: string;
  password: string;
}

interface IUserDB {
  firstName: string;
  surname: string;
  email: string;
}


export async function createUser(user: IUser): Promise<void> {
  try {
    await User.create(user);
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export async function getUserByEmail(email: string): Promise<IUserDB | null> {
  const user = await User.findOne({ email }).select("-password").lean();
  return user as IUserDB | null;
}