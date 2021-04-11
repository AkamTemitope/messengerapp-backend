// imports
import express from 'express'
import { createServer } from "http"
import { Server } from "socket.io"
import mongoose from 'mongoose'
import cors from 'cors'
import { userRoutes, groupRoutes, contactRoutes } from "./routes/routes.js"
import dotenv from "dotenv"
import { SocketManager } from './socket/socket.js'

///// app config

const port = process.env.PORT || 9000
const app = express()
const server = createServer(app)
const io = new Server(server)
dotenv.config()


///// middlewares

app.use(cors())
app.use(express.json())


///// db config
 
const mongoURI = process.env.DATABASE_URL
mongoose.connect(mongoURI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const database = mongoose.connection
database.once("open", () => { console.log('Database Connected') })


//// routes

app.get("/", (req, res) => { res.send("Server working").status(200) })
app.use("/users", userRoutes)
app.use("/groups", groupRoutes)
app.use("/contacts", contactRoutes)


//// socket.io

io.on("connection", SocketManager)


///// listen

server.listen(port, () => console.log(`listening on localhost:${port}`))
 
export default  io 