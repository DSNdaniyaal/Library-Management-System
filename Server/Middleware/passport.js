import {ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-local";
import passport from "passport";
import User from "../models/User.js";

const JWT_SECRET = process.env.JWT_SECRET;

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
}

passport.use(new Strategy(options, async function(jwtPayload, done) {
    try {
        const user = await User.findById(jwtPayload.id);

        if(!user){
            return done(null, false);
        }

        return done(null, user);
    } catch (error) {
        
        return done(error, false);
    }
}));

export default passport;