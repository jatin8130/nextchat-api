import { Router } from "express";
import AuthMiddleware from "../middleware/auth.middleware";
import { createPost, fetchPost } from "../controller/post.controller";

const postRouter = Router()

postRouter.post('/', createPost)
postRouter.get('/', fetchPost)

export default postRouter