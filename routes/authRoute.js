import express from "express"
import { loginController,  registerController, testController } from "../controller/authController.js";
import { requireSinIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

//routing
//REGISTER || METHOD POST
router.post("/register",registerController);
//LOGI||POST
router.post("/login",loginController);


//text routes
router.get("/profil",requireSinIn,testController);
export default router