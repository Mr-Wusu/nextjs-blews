import { Schema, model, models } from "mongoose";

interface ICloth {
  _id: string;
  description: string;
  price: number;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ClothSchema = new Schema<ICloth>({
  description: {
    type: String,
    required: [true, "Clothes must be described"],
    trim: true,
    match: [
      /^[a-zA-Z-]{1,18}$/,
      "Descriptions should not be more than 50 words",
    ],
  },
  price: {
    type:Number,
    required: [true, "Cloth must have a price"],
    trim: true,
  },
  image: {
    type: String,
    required: [true, "Cloth must have a picture"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Cloth = models.Cloth || model<ICloth>("Cloth", ClothSchema);

export default Cloth;
