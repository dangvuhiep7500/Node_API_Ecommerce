import Order from '../models/order';
import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
const NAMESPACE = 'Oder Controller';
function createOrder(orders: any, parentId = null): Object {
    const orderList = [];
    let order;
    if (parentId == null) {
        order = orders.filter((odr: any) => odr.parentId == undefined);
    } else {
        order = orders.filter((odr: any) => odr.parentId == parentId);
    }

    for (let ord of order) {
        orderList.push({
            _id: ord._id,
            customer: ord.customer,
            phoneNumber: ord.phoneNumber,
            address: ord.address,
            parentId: ord.parentId,
            shipment: createOrder(orders, ord._id)
        });
    }

    return orderList;
}
const NewOrder = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, customer, email, phoneNumber, note, address, parentId, products, status } = req.body;
    const order = await new Order({
        userId,
        customer,
        email,
        phoneNumber,
        note,
        products,
        address,
        parentId,
        status
    });
    return order
        .save()
        .then((order) => res.status(201).json(order))
        .catch((error) => res.status(500).json({ error }));
};
const listAllOrder = async (req: Request, res: Response, next: NextFunction) => {
    // return await Order.find()
    //     .then((order) => res.status(200).json(order))
    //     .catch((error) => res.status(500).json({ error }));
           return await Order.find({}).exec((error, order) => {
               if (error) return res.status(400).json({ error });
               if (order) {
                   const orderList = createOrder(order);
                   res.status(200).json(orderList);
               }
           });
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
