import Category from '../models/category';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
const NAMESPACE = 'Category Controller';

const NewCategory = async (req: Request, res: Response, next: NextFunction) => {
    const { categoryName, categoryImage } = req.body;
    const categories = await new Category({
        _id: new mongoose.Types.ObjectId(),
        categoryName,
        categoryImage
    });
    return categories
        .save()
        .then((category) => res.status(201).json(category))
        .catch((error) => res.status(500).json({ error }));
};

const listAllCategory = async (req: Request, res: Response, next: NextFunction) => {
    return await Category.find()
        .then((category) => res.status(200).json(category))
        .catch((error) => res.status(500).json({ error }));
};

const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.params.categoryId;

    return await Category.findById(categoryId)
        .then((category) => {
            if (category) {
                category.set(req.body);

                return category
                    .save()
                    .then((category) => res.status(201).json(category))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
    const categoryId = req.params.categoryId;

    return await Category.findByIdAndDelete(categoryId)
        .then((category) => (category ? res.status(201).json({ category, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};
export default { NewCategory, deleteCategory, updateCategory, listAllCategory };
