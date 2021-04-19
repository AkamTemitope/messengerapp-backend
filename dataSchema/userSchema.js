import mongoose from "mongoose"
const Schema = mongoose.Schema

const userSchema = Schema(
{   
    username: String ,
    photoUrl: { type: String, default: "https://i.postimg.cc/MHgmGcg4/contact.jpg" },
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

