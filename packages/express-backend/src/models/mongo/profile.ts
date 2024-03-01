import { Schema, Model, Document, model } from "mongoose";
import { Profile } from "../../../../lit-frontend/src/models/profile.js";

const profileSchema = new Schema<Profile>(
  {
    userid: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    birthday: { type: String, required: false, trim: true },
    handicap: { type: Number, required: false, trim: true },
  },
  { collection: "user_profiles" }
);

const ProfileModel = model<Profile>("Profile", profileSchema);

export default ProfileModel;