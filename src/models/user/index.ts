import mongoose from "mongoose";
import { User } from "./types";
import bcrypt from "bcryptjs";

type UserDocument = User & mongoose.Document;

const schema = new mongoose.Schema(
  {
    email: { type: "string", required: true, unique: true },
    password: { type: "string", required: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

schema.methods.generatePasswordHash = async (pwd: string): Promise<string> => {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(pwd, salt);
};

schema.methods.comparePassword = (pwd: string, hashedPwd: string): boolean => {
  return bcrypt.compareSync(pwd, hashedPwd);
};

const UserModel = mongoose.model<UserDocument>("User", schema);

export default UserModel;
