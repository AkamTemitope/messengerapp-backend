import express from "express"
import { addMember, deleteAllMessages, deleteGroup, deleteMember, deleteMessage, getAllGroups, getGroupById, newGroup, 
        newMessage, updateDescription, updateName, updatePhoto, } from "./controllers/groupControllers.js"

const router = express.Router()

//// Get action(s)  

router.get("/all", getAllGroups)
router.get("/:id", getGroupById)


//// Post action(s)

// Add new Group
router.post("/new", newGroup)
// Add New Group Message
router.post("/newMessage/:id", newMessage)


//// Patch action(s)

// Add a member 
router.patch("/addMember/:id", addMember)
// update name
router.patch("/updateName/:id", updateName)
// update photo
router.patch("/updatePhoto/:id", updatePhoto)
// update description
router.patch("/updateDescription/:id", updateDescription)


//// Delete action(s)

// Delete a group
router.delete("/deleteGroup/:id", deleteGroup)                
// Delete a member
router.delete("/deleteMember/:id", deleteMember)
// Delete a message
router.delete("/deleteMessage/:id", deleteMessage)
// Delete all messages
router.delete("/deleteMessages/:id", deleteAllMessages)









export default router
