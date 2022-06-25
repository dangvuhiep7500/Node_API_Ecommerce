import { Document } from 'mongoose';
export default interface IProduct extends Document {
    title: string;
    description: string;
    image: string;
    categoryId: number;
    // inventoryId: number;
    price: number;
}
