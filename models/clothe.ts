import { Schema, model, models } from "mongoose";

interface IClothe {
  _id: string;
  description: string;
  alt: string;
  price: number;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const ClotheSchema = new Schema<IClothe>({
  description: {
    type: String,
    required: [true, "Clothes must be described"],
    trim: true,
     validate: {
      validator: function (v: string) {
        return v.trim().split(/\s+/).length <= 50;
      },
      message: "Descriptions should not be more than 50 words",
    },
  },
  alt: {
    type: String,
    required: [true, "Cloth must have an alt text"],
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
});

const Clothe = models.Clothe || model<IClothe>("Clothe", ClotheSchema);

export default Clothe;
