/* eslint-disable no-await-in-loop */
import Agency from '../models/agency';
import { errorResponse } from '../utils/response';

class AgencyController {
	static async newAgency(req, res) {
		try {
			req.body.user = req.user.id;
			const agency = await Agency.create(req.body);

			res.status(201).json({
				success: true,
				message: 'Agency Created Successfully',
				agency,
			});
		} catch (err) {
			return errorResponse(res, 400, err.message);
		}
	}

	static async getAllAgencies(req, res) {
		try {
			const agencies = await Agency.find();
			return res.status(200).send({
				success: true,
				message: 'Agencies are displayed successfully',
				agencies,
			});
		} catch (error) {
			return errorResponse(res, 400, error.message);
		}
	}

	/**
	 * Get details for single agency => /api/v1/agency/:id
	 * @param {object} req
	 * @param {object} res
	 * @returns {object} details of a single agency
	 */
	static async getSingleAgency(req, res) {
		try {
			const agency = await Agency.findById(req.params.id);
			if (agency) {
				return res.status(200).json({
					success: true,
					message: 'Agency are displayed successfully',
					agency,
				});
			}
			return errorResponse(res, 404, 'Agency is not available');
		} catch (err) {
			return errorResponse(res, 400, err.message);
		}
	}
}

export default AgencyController;
