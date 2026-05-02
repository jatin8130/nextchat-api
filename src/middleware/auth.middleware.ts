import { NextFunction, Request, Response } from "express";
import { CatchError, TryError } from "../util/error";
import jwt, { JwtPayload } from "jsonwebtoken";
import mongoose from "mongoose";

export interface PayloadInterface {
    id: mongoose.Types.ObjectId
    name: string
    email: string
    mobile: string
    image: string | null | undefined
}

export interface SessionInterface extends Request {
    session?: PayloadInterface
}

const AuthMiddleware = async (req: SessionInterface, res: Response, next: NextFunction) => {
  try {
    const AccessToken = req.cookies.accessToken;

    if (!AccessToken) throw TryError("Unauthorized", 401);

    const payload = jwt.verify(AccessToken, process.env.AUTH_SECRET_KEY!) as JwtPayload

    req.session = {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      mobile: payload.mobile,
      image: payload.image
    };

    next()

  } catch (err) {
    CatchError(err, res);
  }
};

export default AuthMiddleware;
