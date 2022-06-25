import Order from '../models/order';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
const NAMESPACE = 'Oder Controller';

const NewOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, products, amount, address, status } = req.body;
    const order = await new Order({
        userId,
        products,
        amount,
        address,
        status
    });
    return order
        .save()
        .then((order) => res.status(201).json(order))
        .catch((error) => res.status(500).json({ error }));
};
const listAllOrder = async (req: Request, res: Response, next: NextFunction) => {
    return await Order.find()
        .then((order) => res.status(200).json(order))
        .catch((error) => res.status(500).json({ error }));
};

const updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    const orderId = req.params.orderId;

    return await Order.findById(orderId)
        .then((order) => {
            if (order) {
                order.set(req.body);

                return order
                    .save()
                    .then((order) => res.status(201).json(order))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    const orderId = req.params.orderId;

    return await Order.findByIdAndDelete(orderId)
        .then((order) => (order ? res.status(201).json({ order, message: 'Deleted' }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};
export default { NewOrder, deleteOrder, updateOrder, listAllOrder };
