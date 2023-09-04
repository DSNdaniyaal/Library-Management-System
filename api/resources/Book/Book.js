import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Plese enter the title of the book."]
    },
    author: {
        type: String,
        required: [true, "Please enter the name of the author."]
    },
    isbn: {
        type: String,
        validate: {
            validator: function(v) {
                return (v.length == 10 || v.length == 13);
            },
            message: "ISBN must be of 10 or 13 characters."
        },
        unique: true,
        required: true
    },
    genre: {
        type: String
    },
    copies: {
        type: Number,
        default: 1
    },
    available: {
        type: Number,
        validate: {
            validator: function(v) {
                return v <= this.copies
            },
            message: 'Number of available copies must be less than or equal to total number of copies'
        }
    }
});

bookSchema.pre('save', function(next) {
    this.available = this.copies;
    next();
});



export default mongoose.model('Book', bookSchema);

