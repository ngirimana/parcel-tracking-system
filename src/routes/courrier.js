import express from 'express';
import { isAuthenticatedUser } from '../middleware/auth';
import CourrierController from '../controller/courierController';

const router = express.Router();

router.post(
	'/new-courrier',
	isAuthenticatedUser,
	CourrierController.newCourrier,
);
router.get(
	'/courriers',
	isAuthenticatedUser,
	CourrierController.getAllCourriers,
);
router.get(
	'/courrier/:id',
	isAuthenticatedUser,
	CourrierController.getSingleCourrier,
);
router.get('/track/courrier/:id', CourrierController.trackCourrier);
router.patch(
	'/courrier/:id',
	isAuthenticatedUser,
	CourrierController.updateCourier,
);
router.delete(
	'/courrier/:id',
	isAuthenticatedUser,
	CourrierController.deleteCourier,
);

export default router;
