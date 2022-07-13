import mongoose, { Schema } from 'mongoose';
import ICategories from '../interfaces/category';

const CategorySchema: Schema = new Schema(
    {
        categoryName: { 
            type: String, required: true, unique: true, trim: true 
        },
        slug: {
            type: String,
            required: true,
            unique: true
        },
        categoryImage: { 
            type: String 
        },
        parentId: {
            type: String
        }
    },
    { timestamps: true }
);

export default mongoose.model<ICategories>('Categories', CategorySchema);
