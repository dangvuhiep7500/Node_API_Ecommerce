import { Document } from 'mongoose';
export default interface IOrder extends Document {
    userId: string;
    products: [
        {
            product: object;
            quantity: number;
        }
    ];
    customer: string;
    email: string;
    phoneNumber: number;
    address: string;
    customerReceiver: string;
    phoneReceiver: number;
    addressReceiver: string;
    totalQuantity: number;
    totalSum: number;
    note: string;
    status: string;
    payment: string;
}
