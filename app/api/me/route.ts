import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getUserByEmail } from "@/users/queries";
import connectToDB from "@/settings/database";

export const GET = async () => {
  const session = await auth();
  if (!session?.user) {
    return new NextResponse("You are not authorized to access this route", {
      status: 401,
    });
  }

  await connectToDB();

  try {
    const email = session?.user?.email;
    if (!email) {
      return new NextResponse("User email not found", {
        status: 400,
      });
    }
    const user = await getUserByEmail(email);
    if (!user) {
      return new NextResponse("User not found", {
        status: 404,
      });
    }
    return new NextResponse(JSON.stringify(user), {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("An error occurred while fetching your data", {
      status: 500,
    });
  }
  return new NextResponse("Hey that's me!", {
    status: 201,
  });
};
