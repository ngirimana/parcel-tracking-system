/* eslint-disable no-await-in-loop */
import cloudinary from 'cloudinary';
import Courier from '../models/courrier';
import { errorResponse } from '../utils/response';
import userIdFromToken from '../utils/getUserIdFromToken';

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
					folder: 'notaria',
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
			const courrier = await Courier.create(req.body);

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
}

export default CourrierController;
