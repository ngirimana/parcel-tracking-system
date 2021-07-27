/* eslint-disable no-await-in-loop */
import cloudinary from 'cloudinary';
import cuid from 'cuid';
import Courier from '../models/courrier';
import { errorResponse } from '../utils/response';
import sendSms from '../utils/sms';

class CourrierController {
	static async newCourrier(req, res) {
		try {
			let images = [];
			if (typeof req.body.images === 'string') {
				images.push(req.body.images);
			} else {
				images = req.body.images;
			}

			const imagesLinks = [];

			for (let i = 0; i < images.length; i += 1) {
				const result = await cloudinary.v2.uploader.upload(images[i], {
					folder: 'products',
					overwrite: true,
					invalidate: true,
				});

				imagesLinks.push({
					public_id: result.public_id,
					url: result.secure_url,
				});
			}

			req.body.images = imagesLinks;
			req.body.user = req.user.id;
			req.body.currentLocation = req.body.from;
			req.body.trackingNumber = cuid();
			const courrier = await Courier.create(req.body);
			const welcomeMessage = `Hey ${courrier.firstName} ! Your tracking number is ${courrier.trackingNumber}`;

			sendSms(courrier.phone, welcomeMessage);

			res.status(201).json({
				success: true,
				courrier,
			});
		} catch (err) {
			console.log(err);
			return errorResponse(res, 400, err.message);
		}
	}

	static async getAllCourriers(req, res) {
		try {
			const couriers = await Courier.find();
			return res.status(200).send({
				success: true,
				couriers,
			});
		} catch (error) {
			return errorResponse(res, 400, error.message);
		}
	}

	/**
	 * Get details for single courrier => /api/v1/courriers/:id
	 * @param {object} req
	 * @param {object} res
	 * @returns {object} details of a single Courrier
	 */
	static async getSingleCourrier(req, res) {
		try {
			const courier = await Courier.findById(req.params.id);
			if (courier) {
				return res.status(200).json({
					success: true,
					courier,
				});
			}
			return errorResponse(res, 404, 'Courrier  is not available');
		} catch (err) {
			return errorResponse(res, 400, err.message);
		}
	}

	/**
	 * track courier
	 * @param {object} req
	 * @param {object} res
	 * @returns {object} details of a single Courrier
	 */

	static async trackCourrier(req, res) {
		try {
			const courier = await Courier.findOne({
				trackingNumber: req.params.id,
			});
			if (courier) {
				return res.status(200).json({
					success: true,
					courier,
				});
			}
			return errorResponse(res, 404, 'Courrier  is not available');
		} catch (err) {
			return errorResponse(res, 400, err.message);
		}
	}
	/**
	 * update courier
	 * @param {object} req
	 * @param {object} res
	 * @returns {object } of details for courier product
	 */

	static async updateCourier(req, res) {
		try {
			let courier = await Courier.findById(req.params.id);

			if (!courier) {
				return errorResponse(res, 404, 'Courier is not available');
			}

			let images = [];
			if (typeof req.body.images === 'string') {
				images.push(req.body.images);
			} else {
				images = req.body.images;
			}

			if (images !== undefined) {
				// Deleting images associated with the courier
				for (let i = 0; i < courier.images.length; i += 1) {
					const result = await cloudinary.v2.uploader.destroy(
						courier.images[i].public_id,
					);
				}

				const imagesLinks = [];

				for (let i = 0; i < images.length; i += 1) {
					const result = await cloudinary.v2.uploader.upload(images[i], {
						folder: 'products',
					});

					imagesLinks.push({
						public_id: result.public_id,
						url: result.secure_url,
					});
				}

				req.body.images = imagesLinks;
			}

			courier = await Courier.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
				runValidators: true,
				useFindAndModify: false,
			});

			res.status(200).json({
				success: true,
				courier,
			});
		} catch (err) {
			return errorResponse(res, 400, err.message);
		}
	}

	/**
	 * Delete courier
	 * @param {object} req
	 * @param {object} res
	 * @returns String message 'Courier is deleted successfully.'
	 */

	static async deleteCourier(req, res) {
		try {
			const courier = await Courier.findById(req.params.id);

			if (!courier) {
				return errorResponse(res, 404, 'Courier is not available');
			}

			/**
			 * Deleting images associated with the Courier
			 */
			for (let i = 0; i < courier.images.length; i += 1) {
				const result = await cloudinary.v2.uploader.destroy(
					courier.images[i].public_id,
				);
			}

			await courier.remove();
			res.status(200).json({
				success: true,
				message: 'Courier is deleted.',
			});
		} catch (err) {
			return errorResponse(res, 400, err.message);
		}
	}
}

export default CourrierController;
