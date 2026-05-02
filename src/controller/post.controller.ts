import { Response } from "express";
import { SessionInterface } from "../middleware/auth.middleware";
import PostModel from "../model/Post.model";
import { CatchError, TryError } from "../util/error";

// Create Post

export const createPost = async (req: SessionInterface, res: Response) => {
  try {
    if (!req.session) throw TryError("failed to sent friend request", 401);

    req.body.user = req.session.id;

    const post = await PostModel.create(req.body);

    res.json(post);
  } catch (err) {
    CatchError(err, res, "Failed to create post");
  }
};

// fetch Post

export const fetchPost = async (req: SessionInterface, res: Response) => {
  try {
    const userId = req.session?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const post = await PostModel
      .find({ user: userId })
      .sort({ createdAt: -1 });

    res.json(post);

  } catch (err) {
    CatchError(err, res, "Failed to fetch post");
  }
};