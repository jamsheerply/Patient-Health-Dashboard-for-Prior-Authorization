import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  username: string;
  password: string;
  email: string;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      required: true,
      type: String,
    },
    password: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = model<IUser>("User", userSchema);
export default userModel;
