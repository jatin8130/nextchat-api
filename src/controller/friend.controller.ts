import { Response } from "express";
import { CatchError, TryError } from "../util/error";
import { SessionInterface } from "../middleware/auth.middleware";
import FriendModel from "../model/Friend.model";
import AuthModel from "../model/Auth.model";
import mongoose from "mongoose";

export const addFriend = async (req: SessionInterface, res: Response) => {
  try {
    if (!req.session) throw TryError("failed to sent friend request", 401);

    req.body.user = req.session.id;

    const friend = await FriendModel.create(req.body);

    res.json(friend);
  } catch (err) {
    CatchError(err, res, "Failed to sent friend request err");
  }
};

export const fetchFriend = async (req: SessionInterface, res: Response) => {
  try {
    if (!req.session) throw TryError("failed to fetch friend", 401);

    const user = req.session.id;

    const friends = await FriendModel.find({
      $or: [{ user }, { friend: user }],
    })
      .populate("user", "name image")
      .populate("friend", "name image");

    const seen = new Set();

    const filtered = friends.filter((item: any) => {
      const id1 = item.user._id.toString();
      const id2 = item.friend._id.toString();

      const pair1 = `${id1}-${id2}`;
      const pair2 = `${id2}-${id1}`;

      if (seen.has(pair1) || seen.has(pair2)) {
        return false;
      }

      seen.add(pair1);
      return true;
    });

    res.json(filtered);
  } catch (err) {
    CatchError(err, res, "Failed to load friend");
  }
};

export const suggestedFriend = async (req: SessionInterface, res: Response) => {
  try {
    if (!req.session) throw TryError("failed to load friend", 401);

    const userId = new mongoose.Types.ObjectId(req.session.id);

    const pipeline = [
      { $match: { _id: { $ne: userId } } },
      { $sample: { size: 5 } },
      { $project: { name: 1, image: 1 } },
    ];

    const friend = await AuthModel.aggregate(pipeline);

    const modified = await Promise.all(
      friend.map(async (item) => {
        const count = await FriendModel.countDocuments({
          $or: [
            { user: userId, friend: item._id },
            { user: item._id, friend: userId },
          ],
        });

        return count === 0 ? item : null;
      })
    );

    const filtered = modified.filter((item) => item !== null);

    res.json(filtered);
  } catch (err) {
    CatchError(err, res, "Failed to load friend");
  }
};

export const deleteFriend = async (req: SessionInterface, res: Response) => {
  try {
    await FriendModel.deleteOne({ _id: req.params.id });

    res.json({ message: "Friend deleted" });
  } catch (err) {
    CatchError(err, res, "Failed to delete friend");
  }
};

export const friendRequested = async (req: SessionInterface, res: Response) => {
  try {
    if (!req.session) throw TryError("Failed to load friend request", 401);

    const friend = await FriendModel.find({
      friend: req.session.id,
      status: "requested",
    }).populate("user", "name image");

    res.json(friend);
  } catch (err) {
    CatchError(err, res, "Failed to load friend request");
  }
};

export const updateFriendStatus = async (
  req: SessionInterface,
  res: Response,
) => {
  try {
    if (!req.session) throw TryError("Failed to load friend request", 401);

    await FriendModel.updateOne(
      { user: req.params.id },
      { $set: { status: req.body.status } },
    );
    res.json({ message: "Friend request accepted" });
  } catch (err) {
    CatchError(err, res, "Failed to load friend request");
  }
};
