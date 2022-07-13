import { Document } from 'mongoose';
export default interface ICategories extends Document {
    categoryName: string;
    categoryImage: string;
    parentId: string;
    slug: string;
}
