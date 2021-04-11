import mongoose from "mongoose"
const Schema = mongoose.Schema

const messageSchema = Schema(
{   
    from: { type: Schema.Types.ObjectId, ref: "users" },
    body: String,
    timestamp: { type: Date, default: Date.now },
},
{
    timestamps: true,
})

const Message = mongoose.model('messages', messageSchema);

export default Message