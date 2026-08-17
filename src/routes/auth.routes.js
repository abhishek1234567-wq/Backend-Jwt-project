import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import auhtMiddleware from "../middlewares/auth.middleware.js";

const authRotuer = Router();

/**
 * @description Register Rotue which registers a new user
 * @param { name , email ,password ,role }
 */
authRotuer.post("/register", authController.register);

/**
 * @description Login Existing user and return auth token
 * @param { email ,password }
 */
authRotuer.post("/login", authController.login);

/**
 * @description Return existing user with JWT Token
 */
authRotuer.get("/getMe", auhtMiddleware.auhtUser, authController.getMe);

export default authRotuer;
