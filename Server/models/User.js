import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name."]
    },
    email: {
        type: String,
        required: [true, "Please enter email."],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        minLength: [8, "Password should be greater than 8 characters."],
    },
    borrowedBooks: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Book"
        }
    ],
    role:{
        type: String,
        enum: ["librarian", "student"],
        default: "student"
    }

});


export default mongoose.model("User", userSchema);
