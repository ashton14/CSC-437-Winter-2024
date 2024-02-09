import { Schema, model } from "mongoose";
const profileSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    birthday: {
        type: String,
        required: false,
        trim: true
    }
}, {
    collection: "user_profiles"
});
const ProfileModel = model("Profile", profileSchema);
export default ProfileModel;
