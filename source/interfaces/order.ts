import { Document } from 'mongoose';
export default interface IOrder extends Document {
    userId: string;
    products: [
        {
            product: object;
            quantity: number;
        }
    ];
    totalQuantity: number;
    totalSum: number;
    customer: string;
    email: string;
    phoneNumber: number;
    note: string;
    parentId: string;
    address: string;
    status: string;
}
