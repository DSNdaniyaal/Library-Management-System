import express from "express";
// import passport from "passport";
import { addBook, deleteBook, getBook, getBooks, updateBook } from "./bookController.js";
// import passport from "../Middleware/passport.js"
import { isUserLibrarian } from "../../Middleware/middleware.js";
import {authenticateToken} from "../../Middleware/Authenticate.js";

const router = express.Router();


//Need middleware to authorized user as librarian.


router.route("/").get(authenticateToken, getBooks);

router.route("/add").post(authenticateToken, isUserLibrarian, addBook);

router.route("/:isbn/delete").delete(authenticateToken, isUserLibrarian, deleteBook);

router.route("/:isbn/update").patch(authenticateToken, isUserLibrarian, updateBook);

router.route("/:isbn").get(authenticateToken, getBook);
export default router;