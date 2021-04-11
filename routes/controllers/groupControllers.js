import Group from "../../dataSchema/groupSchema.js"
import Message from "../../dataSchema/messageSchema.js";
import User from "../../dataSchema/userSchema.js";
import mongoose from "mongoose"

export const getAllGroups = (req, res) => {
    Group.find((err, data) => {
        if (err) {
            res.status(500).send(err)
            console.log("Error getting groups")
        }
        else {
            console.log("All groups gotten")
            res.status(201).send(data)
        }
    }) 
}

export const getGroupById = (req, res) => {
    const id = req.params.id

    Group.findById(id)
    .populate("members")
    .populate({ path: "messages", populate: { path: "from", model: "users" }})
    .populate("last_message")
    .exec((err, data) => {

        if (err) {
            res.status(500).send(err)
            console.log("Error getting group")
        }
        else {
            res.status(201).send(data)
            console.log("All good, group details gotten")
            // console.log(data)

        }
    })
}

export const newGroup = (req, res) => {
    const groupData = req.body.group

    Group.create(groupData,  (err, group) => {
        if (err) {
            res.status(500).send(err)
            console.log("Error posting/creating group")
        }
        else {
            User.updateOne({ _id: group.members[0] }, { $push: { groups: group._id }},  
                (err, data) => {
                    if (err) {
                        res.status(500).send(err)
                        console.log("Error posting new group from user")
                    }
                    else {
                        res.status(201).send(group)
                        console.log("group created from user")
                        // console.log(group)

                    }
        
                }
        
            )  
        }
    })

}

export const newMessage = ( req, res) => {
    const id = req.params.id
    const messageData = req.body.message

    Message.create(messageData, (err, message) => {
        if (err) {
            res.status(500).send(err)
            console.log("Error posting/creating msg")
        }
        else {
            Group.updateOne({ _id: id },
                { $push: { messages: message._id },
                  $set: { last_message: message._id }   },
                (err, data) => {
                    if (err) {
                        res.status(500).send(err)
                        console.log("Error posting new group msg")
                    }
                    else {
                        res.status(201).send(message)
                        data && console.log("group msg posted")
                    }
                }
            )
        }
    })
    
}

export const addMember = (req, res) => {
    const id = req.params.id
    const memberId = req.body._id

    if (!mongoose.Types.ObjectId.isValid(memberId)) return res.status(404).send(`No post with memberId: ${memberId}`);

    User.findByIdAndUpdate(memberId, { $push: { groups: id }},
        (err, user) => {
            if (err) {
                console.log("Error adding group._id to user's groups")
            }
            else {
                console.log("Added Group._id To User's Groups")
            }
        })

    Group.findByIdAndUpdate(id, { $push: { members: memberId }}, 
        (err, data) => {
            if (err) {
                res.status(500).send(err)
                console.log("Error adding new member")
            }
            else {
                res.send(data)
                console.log("new member added")

            }
        })

}

export const updateName = (req, res) => {
    const id = req.params.id
    const newName = req.body.groupname

    Group.findByIdAndUpdate(id, { groupname: newName },
        (err, data) => {
            if (err) {
                res.status(500).send(err)
                console.log("Error Updating Group Name")
            }
            else {
                res.status(201).send(data)
                console.log("All good, groupname updated")
    
            }
        })

}

export const updatePhoto = ( req, res) => {
    const id = req.params.id
    const photo = req.body.photoUrl

    Group.findByIdAndUpdate(id, {photoUrl: photo },
        (err, data) => {
            if (err) {
                res.status(500).send(err)
                console.log("Error Updating Group PhotoUrl")
            }
            else {
                res.status(201).send(data)
                console.log("All good, group photo updated")
    
            }
        })
    
}

export const updateDescription = ( req, res) => {
    const id = req.params.id
    const newDescription = req.body.description

    Group.findByIdAndUpdate(id, { description: newDescription },
        (err, data) => {
            if (err) {
                res.status(500).send(err)
                console.log("Error Updating Group Description")
            }
            else {
                res.status(201).send(data)
                console.log("All good, group description updated")
            }
        })
}

export const deleteMember = async ( req, res) => {
    const id = req.params.id
    const memberId = req?.query._id
    
    if (!mongoose.Types.ObjectId.isValid(memberId)) return res.status(404).send(`No group with _id: ${memberId}`);
    
    const user = await User.findById(memberId)
    const filteredGroups = user.groups.filter( groupId => groupId.toString() !== id )
    
    User.findByIdAndUpdate(memberId, { $set: { groups: filteredGroups }},
        (err, data) => {
            if (err) {
                console.log("Error Deleting Groupid From User")
            }
            else {
                console.log("All good, groupid deleted from user")
            }
        })
        
    const group = await Group.findById(id)
    const newMembers = group.members.filter( member => member.toString() !== memberId )
    Group.findByIdAndUpdate(id, { $set: { members: newMembers } },
        (err, data) => {
            if (err) {
                res.status(500).send(err)
                console.log("Error Deleting Group Member")
            }
            else {
                res.status(201).send(data)
                console.log("All good, group member deleted")
            }
        })
}

export const deleteMessage = async ( req, res) => {
    const id = req.params.id
    const messageId = req?.query._id

    if (!mongoose.Types.ObjectId.isValid(messageId)) return res.status(404).send(`No message with _id: ${messageId}`);
    
    Message.findByIdAndDelete(messageId,  (err, data) => {
        if (err) {
            console.log("Error Deleting Message From Database")
        }
        else {
            console.log("All good, message deleted from database")
        }
    })

    const group = await Group.findById(id)
    const newMessages = group.messages.filter( message => message.toString() !== messageId )

    Group.findByIdAndUpdate(id, { $set: { messages: newMessages } },
        (err, data) => {
            if (err) {
                res.status(500).send(err)
                console.log("Error Deleting Group Message")
            }
            else {
                res.status(201).send(data)
                console.log("All good, group message deleted")
            }
        })
}

export const deleteAllMessages = async ( req, res) => {
    const id = req.params.id

    Group.findByIdAndUpdate(id, { $set: { messages: [], last_message: null }},
        (err, data) => {
            if (err) {
                res.status(500).send(err)
                console.log("Error Deleting Group Messages")
            }
            else {
                res.status(201).send(data)
                console.log("All good, group messages deleted")
            }
        })
}

export const deleteGroup = async ( req, res) => {
    const id = req.params.id

    const group = await Group.findById(id)
    const groupMembers = group.members

    groupMembers.map( async (_id) => {

        const user = await User.findById(_id)
        const userGroups = []
        user.groups.forEach( groupId => {
            if(groupId.toString() !== id){
                userGroups.push(groupId)
            }
        })
        await User.findByIdAndUpdate(_id , { $set: { groups: userGroups }}, 
            (err, data) => {
                if (err) {
                    console.log("Error Deleting Group Id From :" + data?.username)
                }
                else {
                    console.log("group id deleted from :" + data?.username)
                }
            })
    })
    console.log("Deleted all group ids from users")

    Group.findByIdAndDelete(id, (err, data) => {
        if (err) {
            res.status(500).send(err)
            console.log("Error Deleting Group")
        }
        else {
            res.status(201).send({ message: "All good, group deleted", data})
            console.log("All good, group deleted")
        }
    })
  

}