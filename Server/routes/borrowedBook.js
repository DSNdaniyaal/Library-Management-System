import express from "express";
// import passport from "passport";
// import passport from "../Middleware/passport.js"
import { isUserLibrarian } from "../Middleware/middleware.js";
import { allIssuedBooks, issueBook, overDueBooks, returnBook } from "../controllers/borrowedBook.js";
import passport from "../Middleware/passport.js";

const router = express.Router();

router.route("/issue").post(passport.authenticate('jwt', { session: false }), isUserLibrarian, issueBook);
router.route("/return").post(passport.authenticate('jwt', { session: false }), isUserLibrarian, returnBook);
router.route("/issuedbooks").get(passport.authenticate('jwt', { session: false }), isUserLibrarian, allIssuedBooks);
router.route("/overduebooks").get(passport.authenticate('jwt', { session: false }), isUserLibrarian, overDueBooks);
export default router;