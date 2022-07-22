import { Document } from 'mongoose';
export default interface IOrder extends Document {
    userId: string;
    products: {
        productId: string;
        quantity: number;
    };
    customer: string;
    email: string;
    phoneNumber: number;
    note: string;
    parentId: string;
    address: string;
    status: string;
}
