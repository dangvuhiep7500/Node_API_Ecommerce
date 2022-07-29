import Order from '../models/order';
import { Request, Response, NextFunction } from 'express';
const NAMESPACE = 'Oder Controller';
const NewOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, customer, email, phoneNumber, note, address, products, status, totalQuantity, totalSum, customerReceiver, phoneReceiver, addressReceiver, payment } = req.body;
    const order = await new Order({
        userId,
        customer,
        email,
        phoneNumber,
        totalQuantity,
        totalSum,
        note,
        products,
        address,
        customerReceiver,
        phoneReceiver,
        addressReceiver,
        status,
        payment,
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
