import { Schema, model, models } from "mongoose";

interface IUser {
  _id: string;
  firstName: string;
  surname: string;
  email: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: [true, "Users must have a firstname"],
    trim: true,
    match: [
      /^[a-zA-Z-]{1,18}$/,
      "First name is invalid, it should contain 1 - 18 alphabetic characters",
    ],
  },
  surname: {
    type: String,
    required: [true, "Users must have a firstname"],
    trim: true,
    match: [
      /^[a-zA-Z-]{1,18}$/,
      "First name is invalid, it should contain 1 - 18 alphabetic characters",
    ],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Users must have an email"],
    trim: true,
    lowercase: true,
  },
  image: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || model<IUser>("User", UserSchema);

export default User;
