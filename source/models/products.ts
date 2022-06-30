import mongoose, { Schema } from 'mongoose';
import IProduct from '../interfaces/products';

const ProductSchema: Schema = new Schema(
    {
        title: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        image: { type: String, required: true },
        categoryId: { type: String, required: true },
        // inventoryId: { type: Number, required: true },
        price: { type: Number, required: true }
    },
    { timestamps: true }
);

export default mongoose.model<IProduct>('Product', ProductSchema);
