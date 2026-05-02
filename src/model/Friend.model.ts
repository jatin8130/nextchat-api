import mongoose, { Schema, model } from "mongoose";

const FriendSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },

    friend: {
      type: Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },

    status: {
      type: String,
      enum: ["requested", "accepted"],
      default: "requested",
    },
  },
  { timestamps: true }
);            

FriendSchema.pre("save", async function () {
  if (this.user.equals(this.friend)) {
    throw new Error("Failed to send friend request");
  }

  const count = await mongoose.model("Friend").countDocuments({
    user: this.user,
    friend: this.friend,
  });

  if (count > 0) {
    throw new Error("Friend request already sent");
  }
});

const FriendModel = model("Friend", FriendSchema);

export default FriendModel;
