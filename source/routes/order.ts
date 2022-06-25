import express from 'express';
import controller from '../controllers/order';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.post('/create', controller.NewOrder);

router.get('/get', controller.listAllOrder);

router.patch('/update/:orderId', controller.updateOrder);

router.delete('/delete/:orderId', controller.deleteOrder);

export default router;
