import mongoose from 'mongoose'

const borrowedBookSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    borrowDate: {
        type: Date,
        default: Date.now()
    },
    dueDate: {
        type: Date,
        default: () => Date.now() + 90 * 86400000
    }
})

export default mongoose.model('BorrowedBook', borrowedBookSchema);
