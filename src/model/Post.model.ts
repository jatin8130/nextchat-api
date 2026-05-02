import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "Auth"
    },
    attachment: {
        type: String,
        default: null
    },
    type: {
        type: String,
        default: null
    },
    content: {
        type: String,
        default: null
    }

}, {timestamps: true})

const PostModel = mongoose.model('post', postSchema)
export default PostModel;