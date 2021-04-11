import mongoose from "mongoose"
import messageSchema from "./messageSchema.js"
const Schema = mongoose.Schema

const contactSchema = Schema(
{   
    created_at: { type: Date, default: Date.now },
    block: { from: String, status: { type: Boolean, default: false}},
    request: { from: String, accept: { type: Boolean, default: false} },
    members: [ { type: Schema.Types.ObjectId, ref: "users" } ],
    messages: [ { type: Schema.Types.ObjectId, ref: "messages" } ],
    last_message: { type: Schema.Types.ObjectId, ref: "messages" },
},
{
    timestamps: true
}
)

const Contact = mongoose.model('contacts', contactSchema);

export default Contact


