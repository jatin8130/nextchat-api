import { Router } from "express";
import {
  addFriend,
  deleteFriend,
  fetchFriend,
  friendRequested,
  suggestedFriend,
  updateFriendStatus,
} from "../controller/friend.controller";

const FriendRouter = Router();

FriendRouter.post("/", addFriend);
FriendRouter.get("/", fetchFriend);
FriendRouter.get("/suggestion", suggestedFriend);
FriendRouter.get("/request", friendRequested);
FriendRouter.delete("/:id", deleteFriend);
FriendRouter.put("/:id", updateFriendStatus);

export default FriendRouter;
