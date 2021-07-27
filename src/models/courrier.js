import mongoose from 'mongoose';
import validator from 'validator';

const courierSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, 'Please enter first name'],
		trim: true,
		maxLength: [100, 'First name cannot exceed 100 characters'],
	},
	lastName: {
		type: String,
		required: [true, 'Please enter last name'],
		trim: true,
		maxLength: [100, 'Last name cannot exceed 100 characters'],
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
	from: {
		type: String,
		required: [true],
	},
	destination: {
		type: String,
		required: [true],
	},
	weight: {
		type: String,
		required: [true],
	},
	receiver: {
		type: String,
		required: [true],
	},
	LeaveTime: {
		type: Date,
		default: Date.now,
	},
	estimationArrivalTime: {
		type: Date,
		default: Date.now,
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: 'User',
		required: true,
	},
	images: [
		{
			public_id: {
				type: String,
				required: true,
			},
			url: {
				type: String,
				required: true,
			},
		},
	],
	trackingNumber: {
		type: String,
		required: [true],
	},
	currentLocation: {
		type: String,
		required: [true],
	},

	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Courier', courierSchema);
