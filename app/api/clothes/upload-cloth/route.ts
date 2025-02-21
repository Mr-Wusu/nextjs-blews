import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/settings/database";
import Clothe from "@/models/clothe";
import multer from "multer";

export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.diskStorage({
  destination: "./public/uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

export async function POST(req: NextRequest, res: NextResponse) {
  const multerUpload = upload.single("image");

  await new Promise<void>((resolve, reject) => {
    multerUpload(req as any, res as any, (err: unknown) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

  await connectToDB();

  const form = await req.formData();
  const name = form.get("name") as string;
  const description = form.get("description") as string;
  const file = (req as any).file;
  const imageUrl = `/uploads/${file.filename}`;

  const newCloth = new Clothe({ name, description, imageUrl });

  try {
    const savedCloth = await newCloth.save();
    return NextResponse.json(savedCloth, { status: 201 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Failed to create the resource" },
      { status: 500 }
    );
  }
}
