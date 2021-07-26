import express from 'express';
import { isAuthenticatedUser } from '../middleware/auth';
import AgencyController from '../controller/agencyController';

const router = express.Router();

router.post('/new-agency', isAuthenticatedUser, AgencyController.newAgency);
router.get('/agencies', isAuthenticatedUser, AgencyController.getAllAgencies);
router.get(
	'/agency/:id',
	isAuthenticatedUser,
	AgencyController.getSingleAgency,
);

export default router;
