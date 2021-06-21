import { Router } from 'express';
import * as UC from '../controllers/userController.js';
import { protect } from '../middleware/AuthMiddleware.js';

const userRouter = Router();

userRouter.route('/email/update').post(protect, UC.updateUserEmail);
userRouter.route('/profile/update').post(protect, UC.updateUserProfile);
userRouter.route('/profile/create').post(protect, UC.createUserProfile);
userRouter.route('/profile').get(protect, UC.usersProfile);

export default userRouter;
