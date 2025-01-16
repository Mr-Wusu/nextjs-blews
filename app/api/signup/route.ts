import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createUser } from "@/users/queries";
import connectToDB  from "@/settings/database";

interface SignupRequest {
  firstName: string,
  surname: string,
  email: string;
  password: string;
}

export const POST = async (request: Request): Promise<NextResponse> => {
  const { firstName, surname, email, password }: SignupRequest = await request.json();

  console.log(firstName, surname, email, password);

  // Create a DB Connection
  await connectToDB();

  // Encrypt the password
  const hashedPassword = await bcrypt.hash(password, 5);
  console.log(hashedPassword)

  // Form a DB payload
  const newUser = {
    firstName,
    surname,
    password: hashedPassword,
    email,
  };

  // Update the DB
  try {
    await createUser(newUser);
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new NextResponse(error.message, {
        status: 500,
      });
    } else {
      throw new NextResponse("An unknown error occurred", {
        status: 500,
      });
    }
  }

  return new NextResponse("User successfully created", {
    status: 201,
  });
};
