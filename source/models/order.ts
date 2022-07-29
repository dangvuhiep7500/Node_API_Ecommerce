import mongoose, { Schema } from 'mongoose';
import ICOrder from '../interfaces/order';
const OrderSchema: Schema = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        products: [
            {
                product: { type: Object },
                quantity: { type: Number }
            }
        ],
        customer: { type: String, required: true },
        email: { type: String, required: true },
        phoneNumber: { type: Number, required: true },
        address: { type: String, required: true },
        customerReceiver: { type: String },
        phoneReceiver: { type: Number},
        addressReceiver: { type: String},
        totalQuantity: { type: Number },
        totalSum: { type: Number },
        note: { type: String },
        status: { type: String, default: 'pending' },
        payment: { type: String }
    },
    { timestamps: true }
);

export default mongoose.model<ICOrder>('Order', OrderSchema);
