import { Schema, model, models } from 'mongoose';

interface IUser {
  _id: string;
  name: string;
  email: string;
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Users must have a name"],
    trim: true,
    match: [
      /^[a-zA-Z0-9!@#$%^&*()_+\[\]{};':"\\|,.<>\/?`~\-]{8,20}$/,
      "Username is invalid, it should contain 8 - 20 alphanumeric letters, special characters and be unique",
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

const User = models.User || model<IUser>('User', UserSchema);

export default User;