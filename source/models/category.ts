import mongoose, { Schema } from 'mongoose';
import ICategories from '../interfaces/category';

const CategorySchema: Schema = new Schema(
    {
        categoryName: { type: String, required: true, unique: true, trim: true },
        categoryImage: { type: String }
    },
    { timestamps: true }
);

export default mongoose.model<ICategories>('Categories', CategorySchema);
