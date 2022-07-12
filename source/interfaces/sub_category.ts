import { Document } from 'mongoose';
export default interface ISubCategories extends Document {
    sub_name: string;
    categoryId: string;
}
