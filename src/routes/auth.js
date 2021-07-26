import express from 'express';
import UserController from '../controller/authController';
import { isAuthenticatedUser, authorizeRoles } from '../middleware/auth';

const router = express.Router();

router.post('/register', UserController.registerUser);
router.post('/login', UserController.loginUser);
router.get('/logout', UserController.logout);
router.post('/password/forgot', UserController.forgotPassword);
router.patch('/password/reset/:token', UserController.resetPassword);
router.get('/me', isAuthenticatedUser, UserController.getUserProfile);
router.patch(
	'/password/update',
	isAuthenticatedUser,
	UserController.updatePassword,
);
router.patch('/me/update', isAuthenticatedUser, UserController.updateProfile);

router.get(
	'/admin/users',
	isAuthenticatedUser,
	authorizeRoles('admin'),
	UserController.allUsers,
);

router.get(
	'/admin/user/:id',
	isAuthenticatedUser,
	authorizeRoles('admin'),
	UserController.getUserDetails,
);
router.patch(
	'/admin/user/:id',
	isAuthenticatedUser,
	authorizeRoles('admin'),
	UserController.updateUser,
);
router.delete(
	'/admin/user/:id',
	isAuthenticatedUser,
	authorizeRoles('admin'),
	UserController.deleteUser ,
);

export default router;
