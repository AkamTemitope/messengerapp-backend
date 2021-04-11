import Contact from "../../dataSchema/contactSchema.js"
import Message from "../../dataSchema/messageSchema.js";
import User from "../../dataSchema/userSchema.js";
import mongoose from "mongoose"

export const getAllContacts = (req, res) => {
    Contact.find((err, data) => {
        if (err) {
            res.status(500).send(err)
            console.log("Error")
        }
        else {
            console.log("getAllContacts, all good")
            res.status(201).send(data)
        }
    }) 
}

export const getContactById = (req, res) => {
    const id = req.params.id

    Contact.findById(id)
    .populate("members")
    .populate({ path: "messages", populate: { path: "from", model: "users" }})
    .populate("last_message")
    .exec((err, data) => {

        if (err) {
            res.status(500).send(err)
            console.log("Error getting contact conversation")
        }
        else {
            res.status(201).send(data)
            console.log("All good contact details gotten")
        }
    })
}

export const newContact = (req, res) => {
    const contactData = req.body.contact
    console.log("contactData")
    console.log(contactData)

    Contact.create(contactData,  (err, contact) => {
        if (err) {
            res.status(500).send(err)
            console.log("Error posting new contact")
        }
        else {
            contact.members.map( contactId => {
                
                User.findByIdAndUpdate(contactId, { $push: { contacts: contact._id } 
                },  (err, data) => {
                    if (err) {
                        console.log("Error adding contact to user")
                    }
                    else {
                        console.log(data)
                        console.log("contact id added to user contacts")
                    }
                    
                })  
                
            })
            res.status(201).send(contact)
            console.log("contact created")
        }
    })
}

export const newMessage = ( req, res) => {
    const id = req.params.id
    const messageData = req.body.message

    Message.create(messageData, (err, message) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            Contact.findByIdAndUpdate(id, 
                { $push: { messages: message._id },
                  $set: { last_message: message._id } 
                },
                (err, data) => {
                    if (err) {
                        res.status(500).send(err)
                        console.log("Error posting new contact msg")
                    }
                    else {
                        res.status(201).send(message)
                        data && console.log("contact msg posted")
                    }
                }
            )
        }
    })
   
}

export const updateRequest = (req, res) => {
    const id = req.params.id
    const newRequest = req.body.request

    Contact.findByIdAndUpdate(id, {request: newRequest },
        (err, data) => {
            if (err) {
                res.status(500).send(err)
                console.log("Error updating request")
            }
            else {
                res.status(201).send(data)
                console.log("request updated")
            }
    })
}

export const updateBlock = (req, res) => {
    const id = req.params.id
    const newBlockStatus = req.body.block
    console.log("newBlockStatus")
    console.log(newBlockStatus)

    Contact.findByIdAndUpdate(id, { $set: { block: newBlockStatus }},
        (err, data) => {
            if (err) {
                res.status(500).send(err)
                console.log("Error updating block status")
            }
            else {
                res.status(201).send(data)
                console.log("updateBlock, all good")
                
            }
    })
}

export const deleteMessage = async ( req, res) => {
    const id = req.params.id
    const messageId = req.body._id
    const contact = await Contact.findById(id)
    
    if (!mongoose.Types.ObjectId.isValid(messageId)) return res.status(404).send(`No message with _id: ${messageId}`);
    const newMessages = contact.messages.filter( message => message.toString() !== messageId )

    Contact.findByIdAndUpdate(id, { $set: { messages: newMessages } },
        (err, data) => {
            if (err) {
                res.status(500).send(err)
                console.log("Error Deleting Contact Message")
            }
            else {
                res.status(201).send(data)
                console.log("All good, contact message deleted")
            }
        })
}

export const deleteAllMessages = async ( req, res) => {
    const id = req.params.id

    Contact.findByIdAndUpdate(id, { $set: { messages: [] , last_message: null }},
        (err, data) => {
            if (err) {
                res.status(500).send(err)
                console.log("Error Deleting Contact Messages")
            }
            else {
                res.status(201).send(data)
                console.log("All good, contact messages deleted")
            }
        })
}

export const deleteContact = async ( req, res) => {
    const id = req.params.id
    const contact = await Contact.findById(id)
    const contactMembers = contact.members

    contactMembers.map( async (_id) => {
        const user = await User.findById(_id)
        const userContacts = user.contacts.filter( (G) => G.toString() !== id )
        User.findByIdAndUpdate(_id , { $set: { contacts: userContacts }}, 
            (err, data) => {
                if (err) {
                    console.log("Error Deleting contact Id From :" + data?.username)
                }
                else {
                    console.log("contact id deleted from :" + data?.username)
                }
            }
        )
    })
    console.log("Deleted all contact ids from users")

    Contact.findByIdAndDelete(id, (err, data) => {
        if (err) {
            res.status(500).send(err)
            console.log("Error Deleting Contact")
        }
        else {
            res.status(201).send({ message: "All good, contact deleted", data})
            console.log("All good, contact deleted")
        }
    })
  

}