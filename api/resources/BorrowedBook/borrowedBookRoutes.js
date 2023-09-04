import express from "express";
// import passport from "passport";
// import passport from "../Middleware/passport.js"
import { isUserLibrarian } from "../../Middleware/middleware.js";
import { allIssuedBooks, issueBook, overDueBooks, returnBook } from "./borrowedBookController.js";
import {authenticateToken} from "../../Middleware/Authenticate.js";

const router = express.Router();

router.route("/issue").post(authenticateToken, isUserLibrarian, issueBook);
router.route("/return").post(authenticateToken, isUserLibrarian, returnBook);
router.route("/issuedbooks").get(authenticateToken, isUserLibrarian, allIssuedBooks);
router.route("/overduebooks").get(authenticateToken, isUserLibrarian, overDueBooks);
export default router;