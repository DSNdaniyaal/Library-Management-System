import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateToken = async(req,res,next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null)return res.sendStatus(401);

    jwt.verify(token,process.env.JWT_SECRET,(err,user) => {
        if(err) return res.status(403);
        req.payload = user;
        next();
    })

}










// import {ExtractJwt } from "passport-jwt";
// import { Strategy } from "passport-local";
// import passport from "passport";
// import User from "../../resources/Users/User.js";

// const JWT_SECRET = process.env.JWT_SECRET;

// const options = {
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: JWT_SECRET
// }

// passport.use(new Strategy(options, async function(jwtPayload, done) {
//     try {
//         const user = await User.findById(jwtPayload.id);

//         if(!user){
//             return done(null, false);
//         }

//         return done(null, user);
//     } catch (error) {
        
//         return done(error, false);
//     }
// }));

// export default passport;