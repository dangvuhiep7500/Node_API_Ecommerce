import mongoose, { Schema } from 'mongoose';
import ICart from '../interfaces/cart';

const CartSchema: Schema = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        products: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
                quantity: { type: Number, default: 1 }
            }
        ]
    },
    { timestamps: true }
);

export default mongoose.model<ICart>('Cart', CartSchema);
