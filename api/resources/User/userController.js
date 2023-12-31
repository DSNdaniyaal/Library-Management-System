import User from "./User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();
const saltRounds = 10;

//Need to move this env file.
const jwtSecret = process.env.JWT_SECRET;
const tokenExpireIn = process.env.TOKEN_EXPIRES_IN;

export const signUp = async (req, res, next) => {
    const { name, email, password , role} = req.body;
    try {
        //Existing User Check
        const existingUser = await User.findOne({ email: email});
        if(existingUser) {
            const err = new Error("User already exist");
            err.status = 400;
            return next(err);
        }

        //hash password
        const hashPassword = bcrypt.hashSync(password, saltRounds);

        //user creation
        const user = await User.create({
            name, email, password: hashPassword,role: role
        })
// {id: user._id}
        //token generate
        //const user = await User.findById(userId);
        const payload = user.toObject();
        //const secret = 'my_secret_key';
        const token = jwt.sign(payload, jwtSecret, { expiresIn: tokenExpireIn});
        res.status(201).json({
            success: true,
            messge: "Sign Up Successfully.",
            token: "Bearer " + token 
        })
    } catch (error) {

        next(error);
    }
}

export const signIn = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        //finding User
        const user = await User.findOne({email: email});
        if(!user) {
            const err = new Error("Invalid Credentials");
            err.status = 401;
            next(err);
        }

        //authenticate user
        const match = bcrypt.compareSync(password, user.password);

        if(!match){
            const err = new Error("Invalid Credentials");
            err.status = 401;
            next(err);
        }
// { id: user._id }
        //generating token
        //const user = await User.findById(userId);
        const payload = user.toObject();
        const secret = 'my_secret_key';
        const token = jwt.sign(payload, jwtSecret, { expiresIn: tokenExpireIn});
        res.status(200).json({
            success: true,
            messge: "Sign In Successfully.",
            token: "Bearer " + token 
        });
    } catch (error) {
        next(error);
    }
}

export const signOut = (req, res) => {
    //This is to be done at client side by removing the header from the further request, (deleting the token from client local storage.)
    res.status(200).json({ message: 'Sign out successful' });
};


export const changeRole = async (req, res, next) => {
    const { email, role } = req.body;
    console.log(req.body);
    try {
        const user = await User.findOne({email: email});
        if(!user) {
            const err = new Error("User not found!");
            err.status = 400;
            next(err);
        }

        const result = await User.updateOne({email: email}, {role: role});
        
        res.status(200).json({
            success: true,
            message: "User role changed successfully.",
            result
        })
    } catch (error) {
        next(error);
    }
}


export const myProfile = async (req, res, next) => {
    res.status(200).json({
        success: true,
        user: req.user
    })
}