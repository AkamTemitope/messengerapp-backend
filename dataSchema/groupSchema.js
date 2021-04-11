import mongoose from "mongoose"
import messageSchema from "./messageSchema.js"
const Schema = mongoose.Schema

const groupSchema = Schema(
{   
    groupname: { type: String, required: true },
    description: String,
    photoUrl: { type: String, default: "http://cdn.onlinewebfonts.com/svg/img_102793.png" },
    created_at: { type: Date, default: Date.now },
    members: [ { type: Schema.Types.ObjectId, ref: "users" } ],
    messages: [ { type: Schema.Types.ObjectId, ref: "messages" } ],
    last_message: { type: Schema.Types.ObjectId, ref: "messages" }
})

const Group = mongoose.model('groups', groupSchema);

export default Group 

