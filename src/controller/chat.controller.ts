import mongoose from "mongoose"
import chatModel from "../model/chat.modal"
import { Request, Response } from "express"
import { CatchError, TryError } from "../util/error"
import { SessionInterface } from "../middleware/auth.middleware"
import { downloadObject } from "../util/s3"

interface payloadInterface {
    from: string
    to: string
    message: string
    file?: {
      path: string,
      type: string
    }
}    

export const createChat = (payload: payloadInterface) => {
  chatModel.create(payload)
  .catch((err) => {
    console.log(err.message)
  });
};

export const fetchChats = async (req: SessionInterface, res: Response) => {
  try {
    if (!req.session) {
      throw TryError("Failed to load chats", 401);
    }

    const chats = await chatModel
      .find({
        $or: [
          { from: req.session.id, to: req.params.to },
          { from: req.params.to, to: req.session.id },
        ],
      })
      .populate("from", "name email image")
      .lean();

    const modified = await Promise.all(
      chats.map(async (item) => {
        if (!item.file) return item;

        const url = item.file.path
          ? await downloadObject(item.file.path)
          : null;

        return {
          ...item,
          file: {
            path: url,
            type: item.file.type,
          },
        };
      })
    );

    return res.json(modified);
  } catch (err) {
    CatchError(err, res, "Failed to load chats");
  }
};