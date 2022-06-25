import express from 'express';
import controller from '../controllers/cart';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.post('/addToCart', extractJWT.requireSignin, controller.addToCart);

router.get('/get/:userId', extractJWT.requireSignin, controller.getCartItem);

router.patch('/update/:id', extractJWT.requireSignin, controller.addToCart);

router.delete('/delete/:cartId', extractJWT.requireSignin, controller.removeCartItems);

export default router;
