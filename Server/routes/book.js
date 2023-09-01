import express from "express";
// import passport from "passport";
import { addBook, deleteBook, getBook, getBooks, updateBook } from "../controllers/book.js";
// import passport from "../Middleware/passport.js"
import { isUserLibrarian } from "../Middleware/middleware.js";
import passport from "../Middleware/passport.js";// pass passport for configuration


const router = express.Router();


//Need middleware to authorized user as librarian.


router.route("/").get(passport.authenticate('jwt', { session: false }), getBooks);

router.route("/add").post(passport.authenticate('jwt', { session: false }), isUserLibrarian, addBook);

router.route("/:isbn/delete").delete(passport.authenticate('jwt', { session: false }), isUserLibrarian, deleteBook);

router.route("/:isbn/update").patch(passport.authenticate('jwt', { session: false }), isUserLibrarian, updateBook);

router.route("/:isbn").get(passport.authenticate('jwt', { session: false }), getBook);
export default router;