import express from "express";
import { changeRole, myProfile, signIn, signOut, signUp } from "../controllers/user.js";
import {  isUserLibrarian } from "../Middleware/middleware.js";
import passport from "../Middleware/passport.js";
// require('../Middleware/passport.js')(passport); // pass passport for configuration
// app.use(passport.initialize());
// import passport from "../Middleware/passport.js"

const router = express.Router();

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/signout").get(signOut);
router.route("/myprofile").get(passport.authenticate('jwt', { session: false }), myProfile);
router.route("/changerole").post(passport.authenticate('jwt', { session: false }), isUserLibrarian, changeRole);

export default router;