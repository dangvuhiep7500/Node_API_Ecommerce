import { Document } from 'mongoose';
export default interface ICart extends Document {
    userId: string;
    products: [
        {
            productId: string;
            quantity: number;
        }
    ];
}
