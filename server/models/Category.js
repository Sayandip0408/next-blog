import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    categoryName:{
        type: String,
        required: true,
    },
    imgUrl:{
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
