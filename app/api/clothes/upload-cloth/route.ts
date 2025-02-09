import { NextResponse } from "next/server";
import connectToDB from "@/settings/database";
import Clothe from "@/models/clothe";

export async function POST(req: Request) {
  await connectToDB();
  const formData = await req.formData();
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const alt = formData.get("alt") as string;
  const image = formData.get("image") as File;

  if (!description || !price || !image) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  const imageBuffer = await image.arrayBuffer();
  const imageBase64 = Buffer.from(imageBuffer).toString("base64");

  const newClothe = new Clothe({
    description,
    price,
    image: imageBase64,
    alt,
  });

  try {
    await newClothe.save();
    return NextResponse.json({ message: "Cloth uploaded successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to upload cloth" },
      { status: 500 }
    );
  }
}
