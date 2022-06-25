import Cart from '../models/cart';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
const NAMESPACE = 'Cart Controller';

const addToCart = (req: Request, res: Response, next: NextFunction) => {
    const { products } = req.body;
    Cart.findOne({ userId: req.body.user._id }).exec((error, cart) => {
        if (error) {
            return res.status(400).json({ message: error });
        }
        if (cart) {
            const product = req.body.products.productId;
            const item = cart.products.find((c) => c.productId == product);
            if (item) {
                Cart.findOneAndUpdate(
                    { userId: req.body.user._id, product },
                    {
                        $set: {
                            products: {
                                ...req.body.products,
                                quantity: item.quantity + req.body.products.quantity
                            }
                        }
                    }
                ).exec((error, _cart) => {
                    if (_cart) {
                        return res.status(201).json({ message: _cart });
                    }
                    if (error) {
                        return res.status(400).json({ message: error });
                    }
                });
            } else {
                Cart.findOneAndUpdate(
                    { userId: req.body.user._id },
                    {
                        $push: {
                            products
                        }
                    }
                ).exec((error, _cart) => {
                    if (error) {
                        return res.status(400).json({ message: error });
                    }
                    if (_cart) {
                        return res.status(201).json({ message: _cart });
                    }
                });
            }
        } else {
            const cart = new Cart({
                userId: req.body.user._id,
                products
            });
            return cart
                .save()
                .then((cart) => res.status(200).json( cart ))
                .catch((error) => res.status(500).json({ message: 'error', error }));
        }
    });
};

const getCartItem = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;
    await Cart.findOne({ userId: userId })
        .then((cart) => res.status(200).json({ cart }))
        .catch((error) => res.status(500).json({ message: 'error', error }));
};

const getAllItem = async (req: Request, res: Response, next: NextFunction) => {
    return await Cart.find()
        .then((cart) => res.status(200).json({ cart }))
        .catch((error) => res.status(500).json({ error }));
};

const removeCartItems = async (req: Request, res: Response, next: NextFunction) => {
    const cartId = req.params.cartId;
    await Cart.findByIdAndDelete(cartId)
        .then((cart) => res.status(200).json({ message: 'Deleted' }))
        .catch((error) => res.status(500).json({ message: 'error', error }));
};

export default { addToCart, getCartItem, getAllItem, removeCartItems };
