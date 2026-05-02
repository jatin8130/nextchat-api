import { Router } from "express";
import {
  ForgetPassword,
  GetrefreshToken,
  GetSession,
  Login,
  Logout,
  Signup,
  updateProfilePicture,
} from "../controller/auth.controller";
import AuthMiddleware from "../middleware/auth.middleware";
import { refreshtokenmiddleware } from "../middleware/refresh.middleware";

const AuthRouter = Router();

AuthRouter.post("/signup", Signup);
AuthRouter.post("/login", Login);
AuthRouter.post("/forget-password", ForgetPassword);
AuthRouter.get("/session", GetSession);
AuthRouter.put("/profile-picture", AuthMiddleware, updateProfilePicture);
AuthRouter.get("/refresh-token", refreshtokenmiddleware, GetrefreshToken);
AuthRouter.post("/logout", Logout)

export default AuthRouter;
