import express from "express";
import { changeRole, myProfile, signIn, signOut, signUp } from "./userController.js";
import {  isUserLibrarian } from "../../Middleware/middleware.js";
import {authenticateToken} from "../../Middleware/Authenticate.js";
// require('../Middleware/passport.js')(passport); // pass passport for configuration
// app.use(passport.initialize());
// import passport from "../Middleware/passport.js"

const router = express.Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/signout").get(signOut);
router.route("/myprofile").get(authenticateToken, myProfile);
router.route("/changerole").post(authenticateToken, isUserLibrarian, changeRole);

export default router;