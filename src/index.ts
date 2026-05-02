import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
mongoose.connect(process.env.MONGO_URI!)

.then(() => {
    console.log("Mongodb connect to database ✅")
})

.catch((err) => {
    console.log({message: err.message})
    process.exit(1);
})

import express from "express";
import cors from 'cors'
import cookieParser from 'cookie-parser'
import AuthRouter from "./router/auth.router";
import StorageRouter from "./router/storage.router";
import AuthMiddleware from "./middleware/auth.middleware";
import FriendRouter from "./router/friend.router";
import { serve, setup } from "swagger-ui-express";
import swaggerConfig from "./util/Swagger";
import { Server } from "socket.io";
import { createServer } from "http";
import StatusSocket from "./socket/status.socket";
import CorsConfig from "./util/cors";
import ChatSocket from "./socket/chat.socket";
import ChatRouter from "./router/chat.router";
import videoSocket from "./socket/video.socket";
import twilioRouter from "./router/twilio.router";
import postRouter from "./router/post.router";

const app = express()
const server = createServer(app)

//Socket connection
const io = new Server(server, {
    cors: CorsConfig
})

StatusSocket(io)
ChatSocket(io)
videoSocket(io)

//Middleware

app.use(cors(CorsConfig))
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api-docs', serve, setup(swaggerConfig))

app.use('/auth', AuthRouter);
app.use('/storage', AuthMiddleware, StorageRouter);
app.use('/friend', AuthMiddleware, FriendRouter)
app.use("/chat", ChatRouter)
app.use('/twilio', twilioRouter)
app.use('/post', AuthMiddleware, postRouter)

server.listen(process.env.PORT || 8080, () => {
    console.log(`Server connected to PORT ${process.env.PORT || 8080}`)
})