import express from "express"
import { deleteAllMessages, deleteContact, deleteMessage, getAllContacts, getContactById, newContact, newMessage, updateBlock, updateRequest } from "./controllers/contactControllers.js"

const router = express.Router()

//// Get action(s)  

// Get Contact Content
router.get("/all", getAllContacts)
router.get("/:id", getContactById)


//// Post action(s)

// Add new Contact
router.post("/new", newContact)
// Add new Message
router.post("/newMessage/:id", newMessage)


//// Patch action(s)

// update request
router.patch("/updateRequest/:id", updateRequest)
// block/unblock contact
router.patch("/updateBlock/:id", updateBlock)


//// Delete action(s)

// Delete contact
router.delete("/deleteContact/:id", deleteContact)
// Delete a message
router.delete("/deleteMessage/:id", deleteMessage)
// Delete all messages
router.delete("/deleteMessages/:id", deleteAllMessages)
 





export default router
