import express from 'express';

import usercontroller from '../controllers/user';
import extractJWT from '../middleware/extractJWT';

const router = express.Router();

/**user */
router.get('/validate', extractJWT.extractJWT, usercontroller.validateToken);

router.post('/register', usercontroller.resgisterUser);

router.post('/login', usercontroller.loginUser);

router.get('/getUser/:id', usercontroller.readUserId);

router.patch('/update/:id', usercontroller.updateUser);

router.delete('/delete/:id', usercontroller.deleteUser);

router.get('/get/all', usercontroller.getAllUsers);

export default router;
