import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AuthModel from "../model/Auth.model";
import { CatchError, TryError } from "../util/error";
import {
  PayloadInterface,
  SessionInterface,
} from "../middleware/auth.middleware";
import { v4 as uuid } from "uuid";
import moment from "moment";

const generateToken = (payload: PayloadInterface) => {
  const accessToken = jwt.sign(payload, process.env.AUTH_SECRET_KEY!, {
    expiresIn: "10m",
  });
  const refreshToken = uuid();
  return { accessToken, refreshToken };
};

const getOption = (token: string) => {
  return {
    httpOnly: true,
    maxAge: token === "at" ? (10*60*1000) : (7*24*60*60*1000),
    secure: false,
    domain: "localhost"
  };
};

//signup function

export const Signup = async (req: Request, res: Response) => {
  try {
    await AuthModel.create(req.body);
    res.json({ message: "Signup success" });
  } catch (err: unknown) {
    CatchError(err, res);
  }
};

//login function

export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await AuthModel.findOne({ email });

    if (!user)
      throw TryError("User not found, Please try to signup first", 401);

    const islogin = await bcrypt.compare(password, user.password);

    if (!islogin)
      throw TryError("Invalid credentials email or password incorrect", 401);

    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      mobile: user.mobile,
      image: user.image,
    };

    const { accessToken, refreshToken } = generateToken(payload);

    await AuthModel.updateOne(
      { _id: user._id },
      {
        $set: {
          refreshtoken: refreshToken,
          expiry: moment().add(7, "days").toDate(),
        },
      },
    );

    res.cookie("accessToken", accessToken, getOption("at"));
    res.cookie("refreshToken", refreshToken, getOption("rt"));
    res.json({ message: "Login success" });
  } catch (err: unknown) {
    CatchError(err, res);
  }
};

//forget-password function

export const ForgetPassword = async (req: Request, res: Response) => {
  try {
    res.send("forget-password");
  } catch (err: unknown) {
    CatchError(err, res);
  }
};

//Session function

export const GetSession = async (req: Request, res: Response) => {
  try {
    const Token = req.cookies.accessToken;

    if (!Token) throw TryError("Invalid session", 401);

    const session = jwt.verify(Token, process.env.AUTH_SECRET_KEY!);
    res.json(session);
  } catch (err: unknown) {
    CatchError(err, res);
  }
};

// Update profile picture

export const updateProfilePicture = async (
  req: SessionInterface,
  res: Response,
) => {
  try {
    const path = `${process.env.S3_URL}/${req.body.path}`

    if (!path) throw TryError("failed to update profile picture", 400);

    if (!req.session) throw TryError("failed to update profile picture", 400);

    await AuthModel.updateOne(
      {
        _id: req.session.id,
      },
      { $set: { image: path } },
    );

    res.json({ path });
  } catch (err: unknown) {
    CatchError(err, res);
  }
};

// Refresh token function

export const GetrefreshToken = async (req: SessionInterface, res: Response) => {
  try {
    if (!req.session) throw TryError("Failed to refresh token", 401);

    const { accessToken, refreshToken } = generateToken(req.session);

    const user = await AuthModel.updateOne(
      { _id: req.session.id },
      {
        $set: {
          refreshtoken: refreshToken,
          expiry: moment().add(7, "days").toDate(),
        },
      },
    );
    
    res.cookie("accessToken", accessToken, getOption("at"));
    res.cookie("refreshToken", refreshToken, getOption("rt"));

    res.json({ message: "Token refreshed" });

  } catch (err: unknown) {
    CatchError(err, res, "Failed to refresh token");
  }
};

export const Logout = async (req: Request, res: Response) => {
  try {
    const Option = {
      httpOnly: true,
      maxAge: 0,
      secure: false,
      domain: "localhost"
    };

    res.clearCookie("accessToken", Option);
    res.clearCookie("refreshToken", Option);

    res.json({message: "Logout success"})

  } catch (err) {
    CatchError(err, res, "Failed to logout");
  }
};
