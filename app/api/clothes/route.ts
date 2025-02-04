import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import connectToDB from "@/settings/database";
import Cloth from "@/models/cloth";

export async function GET(req: NextRequest): Promise<NextResponse> {
  console.log(req.url, req.text);
  
  await connectToDB();
  

  const res = await Cloth.find().select(["-createdAt", "-updatedAt"]);
  console.log(res);

  return NextResponse.json(res);
}
