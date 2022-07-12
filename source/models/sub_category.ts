import mongoose, { Schema } from 'mongoose';
import ISubCategories from '../interfaces/sub_category';

const SubCategorySchema: Schema = new Schema(
    {
        sub_name: { type: String, required: true, unique: true, trim: true },
        categoryId: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model<ISubCategories>('SubCategories', SubCategorySchema);
