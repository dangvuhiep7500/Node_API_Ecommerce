import { Document } from 'mongoose';
export default interface IOrder extends Document {
    userId: string;
    products: {
        productId: string;
        quantity: number;
    };
    amount: number;
    address: string;
    status: string;
}
