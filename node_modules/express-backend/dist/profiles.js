import ProfileModel from "./models/mongo/profile.js";
function index() {
    return ProfileModel.find();
}
function get(userid) {
    return ProfileModel.find({
        userid
    }).then((list)=>list[0]).catch((err)=>{
        throw `${userid} Not Found`;
    });
}
function create(profile) {
    const p = new ProfileModel(profile);
    return p.save();
}
function update(userid, profile) {
    return new Promise((resolve, reject)=>{
        ProfileModel.findOneAndUpdate({
            userid
        }, profile, {
            new: true
        }).then((profile)=>{
            if (profile) resolve(profile);
            else reject("Failed to update profile");
        });
    });
}
export default {
    index,
    get,
    create,
    update
};
