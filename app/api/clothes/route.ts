import { NextResponse } from "next/server";
import connectToDB from "@/settings/database";
import Clothe from "@/models/clothe";

export async function GET() {
  await connectToDB();
  const clothes = await Clothe.find().select(["-createdAt", "-updatedAt"]);
  return NextResponse.json(clothes);
}


