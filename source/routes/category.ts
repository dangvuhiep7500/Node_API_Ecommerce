import express from 'express';
import controller from '../controllers/category';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

router.post('/create', extractJWT.requireSignin, extractJWT.adminMiddleware, controller.NewCategory);

router.get('/category', controller.listAllCategory);

router.patch('/update/:categoryId', extractJWT.requireSignin, extractJWT.adminMiddleware, controller.updateCategory);

router.delete('/delete/:categoryId', extractJWT.requireSignin, extractJWT.adminMiddleware, controller.deleteCategory);

export default router;
