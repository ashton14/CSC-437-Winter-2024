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
export default {
    index,
    get,
    create
};
