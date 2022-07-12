import Category from '../models/category';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import sub_category from '../models/sub_category';
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
const addSubCategory = async (req: Request, res: Response, next: NextFunction) => {
    const { categoryId, sub_name } = req.body;
    const subcategories = await new sub_category({
        _id: new mongoose.Types.ObjectId(),
        categoryId,
        sub_name
    });
    return subcategories
        .save()
        .then((subcategory) => res.status(201).json(subcategory))
        .catch((error) => res.status(500).json({ error }));
};

const listAllCategory = async (req: Request, res: Response, next: NextFunction) => {
    // const { SubCategory } = req.body;
    // {
    //     attributes: ['id', 'name'],
    //     include: [{ model: SubCategory }]
    // }
    return await Category.find()
        .then((category) => res.status(200).json(category))
        .catch((error) => res.status(500).json({ error }));
};
const listAllSubCategory = async (req: Request, res: Response, next: NextFunction) => {
    const { category } = req.body;
    return await sub_category
        .find({
            where: { categoryId: req.query.categoryId },
            include: [{ model: category, attributes: ['id', 'name'] }]
        })
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
export default { NewCategory, deleteCategory, updateCategory, listAllCategory, addSubCategory, listAllSubCategory };
