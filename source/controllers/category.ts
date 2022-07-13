import Category from '../models/category';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
const NAMESPACE = 'Category Controller';

function createCategories(categories: any, parentId = null): Object {
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter((cat: any) => cat.parentId == undefined);
    } else {
        category = categories.filter((cat: any) => cat.parentId == parentId);
    }

    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            categoryName: cate.categoryName,
            categoryImage: cate.categoryImage,
            slug: cate.slug,
            parentId: cate.parentId,
            children: createCategories(categories, cate._id)
        });
    }

    return categoryList;
}
const NewCategory = async (req: Request, res: Response, next: NextFunction) => {
    const { categoryName, categoryImage, slug, parentId } = req.body;
    const categories = await new Category({
        _id: new mongoose.Types.ObjectId(),
        categoryName,
        categoryImage,
        parentId,
        slug
    });
    return categories
        .save()
        .then((category) => res.status(201).json(category))
        .catch((error) => res.status(500).json({ error }));
};

const listAllCategory = async (req: Request, res: Response, next: NextFunction) => {
    return await Category.find({}).exec((error, categories) => {
        if (error) return res.status(400).json({ error });
        if (categories) {
            const categoryList = createCategories(categories);
            res.status(200).json( categoryList );
        }
    });
    // .then((category) => res.status(200).json(category))
    // .catch((error) => res.status(500).json({ error }));
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
export default { NewCategory, deleteCategory, updateCategory, listAllCategory};
