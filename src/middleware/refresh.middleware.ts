import { NextFunction, Request, Response } from "express";
import { CatchError, TryError } from "../util/error";
import AuthModel from "../model/Auth.model";
import moment from "moment";
import { SessionInterface } from "./auth.middleware";

export const refreshtokenmiddleware = async (
  req: SessionInterface,
  res: Response,
  next: NextFunction,
) => {
  try {
    const refreshtoken = req.cookies.refreshToken;

    if (!refreshtoken) throw TryError("Failed to refresh token", 401);

    const user = await AuthModel.findOne({ refreshtoken });

    if (!user) throw TryError("Failed to refresh token", 401);

    const today = moment();
    const expiry = moment(user.expiry);

    const isExpired = today.isAfter(expiry);

    if (isExpired) throw TryError("Failed to refresh token", 401);

    req.session = {
      id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      image: user.image
    };

    next();
  } catch (err: unknown) {
    CatchError(err, res, "Failed to refresh token");
  }
};
