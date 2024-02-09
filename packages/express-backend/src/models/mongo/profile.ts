import { Schema, Model, Document, model } from "mongoose";
import { Profile } from "../profile.js";

const profileSchema = new Schema<Profile>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    birthday: { type: String, required: false, trim: true },
  },
  { collection: "user_profiles" }
);

const ProfileModel = model<Profile>("Profile", profileSchema);

export default ProfileModel;