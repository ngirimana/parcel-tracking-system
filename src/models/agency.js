import mongoose from 'mongoose';
import validator from 'validator';

const agencySchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please enter first name'],
		trim: true,
		maxLength: [100, 'First name cannot exceed 100 characters'],
	},

	phone: {
		type: String,
		required: [true, 'Please enter Phone number'],
	},
	email: {
		type: String,
		required: [true, 'Please enter your email'],
		validate: [validator.isEmail, 'Please enter valid email address'],
	},
	tinNumber: {
		type: Number,
		required: [true, 'Please enter your tin Number'],
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true,
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Agency', agencySchema);
