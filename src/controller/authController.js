import crypto from 'crypto';
import cloudinary from 'cloudinary';
import User from '../models/user';
import sendToken from '../utils/jwtToken';
import { errorResponse, successResponse } from '../utils/response';
import sendEmail from '../utils/sendEmail';

class UserController {
	static async registerUser(req, res) {
		try {
			const { firstName, lastName, email, password } = req.body;
			const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
				folder: 'notaria',
			});
			const user = await User.create({
				firstName,
				lastName,
				email,
				password,
				avatar: {
					public_id: result.public_id,
					url: result.secure_url,
				},
			});
			res.status(200).json({
				status: 200,
				message: 'User created successfully',
				user,
			});
		} catch (err) {
			return errorResponse(res, 400, err.message);
		}
	}

	static async loginUser(req, res) {
		const { email, password } = req.body;

		// Checks if email and password is entered by user
		if (!email || !password) {
			return errorResponse(res, 400, 'Please enter email & password');
		}
		// Finding user in database
		const user = await User.findOne({ email }).select('+password');

		if (!user) {
			return errorResponse(res, 401, 'Invalid Email or Password');
		}
		// Checks if password is correct or not
		const isPasswordMatched = await user.comparePassword(password);

		if (!isPasswordMatched) {
			return errorResponse(res, 401, 'Invalid Email or Password');
		}
		sendToken(user, 200, res);
	}

	// Forgot Password   =>  /api/v1/password/forgot
	static async forgotPassword(req, res) {
		const user = await User.findOne({ email: req.body.email });

		if (!user) {
			return errorResponse(res, 404, 'User not found with this email');
		}

		// Get reset token
		const resetToken = user.getResetPasswordToken();

		await user.save({ validateBeforeSave: false });

		// Create reset password url
		const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

		const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

		try {
			await sendEmail({
				email: user.email,
				subject: 'ShopNow Password Recovery',
				message,
			});

			res.status(200).json({
				success: true,
				message: `Email sent to: ${user.email}`,
			});
		} catch (error) {
			user.resetPasswordToken = undefined;
			user.resetPasswordExpire = undefined;

			await user.save({ validateBeforeSave: false });

			return errorResponse(res, 500, error.message);
		}
	}

	// Reset Password   =>  /api/v1/password/reset/:token
	static async resetPassword(req, res) {
		try {
			// Hash URL token
			const resetPasswordToken = crypto
				.createHash('sha256')
				.update(req.params.token)
				.digest('hex');

			const user = await User.findOne({
				resetPasswordToken,
				resetPasswordExpire: { $gt: Date.now() },
			});

			if (!user) {
				return errorResponse(
					res,
					400,
					'Password reset token is invalid or has been expired',
				);
			}

			if (req.body.password !== req.body.confirmPassword) {
				return errorResponse(res, 400, 'Password does not match');
			}

			// Setup new password
			user.password = req.body.password;

			user.resetPasswordToken = undefined;
			user.resetPasswordExpire = undefined;

			await user.save();

			sendToken(user, 200, res);
		} catch (error) {
			return errorResponse(res, 500, error.message);
		}
	}

	// Get currently logged in user details   =>   /api/v1/me
	static async getUserProfile(req, res) {
		try {
			const user = await User.findById(req.user.id);

			res.status(200).json({
				success: true,
				user,
			});
		} catch (error) {
			return errorResponse(res, 500, error.message);
		}
	}

	// Update / Change password   =>  /api/v1/password/update
	static async updatePassword(req, res) {
		try {
			const user = await User.findById(req.user.id).select('+password');
			// Check previous user password
			const isMatched = await user.comparePassword(req.body.oldPassword);
			if (!isMatched) {
				return errorResponse(res, 404, 'Old password is incorrect');
			}
			user.password = req.body.password;
			await user.save();

			sendToken(user, 200, res);
		} catch (error) {
			return errorResponse(res, 500, error.message);
		}
	}

	// Update user profile   =>   /api/v1/me/update
	static async updateProfile(req, res) {
		try {
			const newUserData = {
				name: req.body.name,
				email: req.body.email,
			};
			if (req.user.avatar !== '') {
				const user = await User.findById(req.user.id);
				const imageId = user.avatar.public_id;
				await cloudinary.v2.uploader.destroy(imageId);

				const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
					folder: 'avatars',
					width: 500,
					crop: 'scale',
				});
				newUserData.avatar = {
					public_id: result.public_id,
					url: result.secure_url,
				};
			}
			const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
				new: true,
				runValidators: true,
				useFindAndModify: false,
			});

			res.status(200).json({
				success: true,
				user,
			});
		} catch (error) {
			return errorResponse(res, 500, error.message);
		}
	}

	static async logout(req, res) {
		try {
			res.cookie('token', null, {
				expires: new Date(Date.now()),
				httpOnly: true,
			});
			return successResponse(res, 200, 'Logged out');
		} catch (err) {
			return errorResponse(res, 500, err.message);
		}
	}

	// Admin Routes

	// Get all users   =>   /api/v1/admin/users
	static async allUsers(req, res) {
		try {
			const users = await User.find();

			res.status(200).json({
				success: true,
				users,
			});
		} catch (err) {
			return errorResponse(res, 500, err.message);
		}
	}

	// Get user details   =>   /api/v1/admin/user/:id
	static async getUserDetails(req, res) {
		try {
			const user = await User.findById(req.params.id);
			console.log(user);

			if (!user) {
				return errorResponse(
					res,
					404,
					`User does not found with id: ${req.params.id}`,
				);
			}

			res.status(200).json({
				success: true,
				user,
			});
		} catch (err) {
			return errorResponse(res, 500, err.message);
		}
	}

	// Update user profile   =>   /api/v1/admin/user/:id
	static async updateUser(req, res) {
		try {
			const newUserData = {
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email,
				role: req.body.role,
			};

			const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
				new: true,
				runValidators: true,
				useFindAndModify: false,
			});

			res.status(200).json({
				success: true,
				user,
			});
		} catch (err) {
			return errorResponse(res, 500, err.message);
		}
	}

	// Delete user   =>   /api/v1/admin/user/:id
	static async deleteUser(req, res) {
		try {
			const user = await User.findById(req.params.id);

			if (!user) {
				return errorResponse(`User does not found with id: ${req.params.id}`);
			}

			await user.remove();

			res.status(200).json({
				success: true,
			});
		} catch (err) {
			return errorResponse(res, 500, err.message);
		}
	}
}
export default UserController;
