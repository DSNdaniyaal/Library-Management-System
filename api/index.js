import express from "express";
import session from 'express-session';
import mongoose from "mongoose";
import dotenv from "dotenv";
import {borrowedBookRoutes,userRoutes,bookRoutes} from "./Routes/index.js";
// import passport from 'passport'


/* App Config */
const app = express();
app.use(session({
  secret: 'some secret key', // change this to a secure value
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true } // change this according to your needs
}));
dotenv.config();


const port = process.env.PORT || 4000;
app.use(express.json({ limit: '5mb' }))
app.use(express.urlencoded({ limit: '5mb', extended: true }))


/* Middlewares */
app.use(express.json());

/* API Routes */
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/borrowedBook", borrowedBookRoutes);

/* MongoDB connection */
mongoose.connect(process.env.CONNECTION_URL).then(() => console.log("Connected to MongoDB")).catch(err => console.error(err));

app.get("/", (req, res) => {
  res.status(200).send("Welcome to LibraryApp");
});

/* Port Listening In */
app.listen(port, () => {
  console.log(`Server is running in PORT ${port}`);
});