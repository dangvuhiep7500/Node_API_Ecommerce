import { Document } from 'mongoose';
export default interface IProduct extends Document {
    title: string;
    description: string;
    image: string;
    imageDetail: [string];
    categoryId: string;
    price: number;
}
