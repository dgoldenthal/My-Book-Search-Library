import { Schema, model } from 'mongoose';
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    savedBooks: [
        {
            bookId: {
                type: String,
                required: true,
            },
            authors: [String],
            description: String,
            title: {
                type: String,
                required: true,
            },
            image: String,
            link: String,
        },
    ],
});
// Export the model
export default model('User', userSchema);
