import express from "express"
import { getAllUser, getUserByEmail, getUserById, newUser, updateName, updatePhoto, userExists } from "./controllers/userControllers.js"

const router = express.Router()

//// Get action(s)  

router.get("/exist", userExists)
router.get("/all", getAllUser)
router.get("/user/:id", getUserById)
router.get("/email", getUserByEmail)


//// Post action(s)

// Add New User
router.post("/new", newUser)


//// Patch action(s)

// update name
router.patch("/updateName/:id", updateName)
// update photo
router.patch("updatePhoto/:id", updatePhoto)


export default router
