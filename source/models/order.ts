import mongoose, { Schema } from 'mongoose';
import ICOrder from '../interfaces/order';
const OrderSchema: Schema = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        products: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
                quantity: { type: Number, default: 1 }
            }
        ],
        // quantity: { type: Number, required: true },
        customer: { type: String },
        email: { type: String },
        phoneNumber: { type: Number },
        address: { type: String, required: true },
        note: { type: String },
        parentId: { type: String },
        status: { type: String, default: 'pending' }
    },
    { timestamps: true }
);

export default mongoose.model<ICOrder>('Order', OrderSchema);
