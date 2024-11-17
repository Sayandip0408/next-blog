import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    synopsis: {
        type: String,
        required: true,
    },
    img_url: {
        type: String,
        required: true,
    },
    img_title: {
        type: String,
    },
}, {
    timestamps: true,
});

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);
