import { Router } from "express";
import {registerValidator,loginValidator} from "../validators/auth.validator.js";
import {registerController,loginController,refreshController, getMe} from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
const router=Router();

router.post("/register",registerValidator,registerController);
router.post("/login",loginValidator,loginController);
router.post("/refresh",refreshController);
router.get("/me",authenticate,getMe)
export default router