import Product from '../models/products';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
const NAMESPACE = 'Product Controller';

const NewProduct = async (req: Request, res: Response, next: NextFunction) => {
    const { title, description, image, categoryId, price } = req.body;
    const product = await new Product({
        _id: new mongoose.Types.ObjectId(),
        title,
        description,
        image,
        categoryId,
        price
    });
    return product
        .save()
        .then((product) => res.status(201).json(product))
        .catch((error) => res.status(500).json({ error }));
};

const listProduct = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;

    return await Product.findById(productId)
        .exec()
        .then((product) => (product ? res.status(200).json(product) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

const listAllProduct = async (req: Request, res: Response, next: NextFunction) => {
    return await Product.find()
        .then((product) => res.status(200).json(product))
        .catch((error) => res.status(500).json({ error }));
};

const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;

    return await Product.findById(productId)
        .then((product) => {
            if (product) {
                product.set(req.body);

                return product
                    .save()
                    .then((product) => res.status(201).json(product))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;

    return await Product.findByIdAndDelete(productId)
        .then((product) => (product ? res.status(201).json({ product, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default { NewProduct, listProduct, listAllProduct, updateProduct, deleteProduct };
