import mongoose from "mongoose"
const Schema = mongoose.Schema

const userSchema = Schema(
{   
    username: String ,
    photoUrl: { type: String, default: "https://yt3.ggpht.com/a/AATXAJzVcPcvV7ren_sqeF250M1ibUVhvGA2ayTl7PI7=s900-c-k-c0xffffffff-no-rj-mo" },
    email: { type: String, lowercase: true, unique: true },
    is_active: { type: Boolean, default: false },
    contacts: [ { type: Schema.Types.ObjectId, ref: "contacts" } ],
    groups: [ { type: Schema.Types.ObjectId, ref: "groups" } ],
},
{
    timestamps: true
}
)

const User = mongoose.model('users', userSchema);

export default User
