import express from 'express';
import controller from '../controllers/products';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.post('/create', extractJWT.requireSignin, extractJWT.adminMiddleware, controller.NewProduct);

router.get('/:productId', controller.listProduct);

router.get('/', controller.listAllProduct);

router.patch('/update/:productId', extractJWT.requireSignin, extractJWT.adminMiddleware, controller.updateProduct);

router.delete('/delete/:productId', extractJWT.requireSignin, extractJWT.adminMiddleware, controller.deleteProduct);

export default router;
