/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-await */
import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { config } from 'dotenv';


config();

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, 'Please enter your full name'],
		maxLength: [100, 'Your first name cannot exceed 30 characters'],
	},
	lastName: {
		type: String,
		required: [true, 'Please enter your last name'],
		maxLength: [100, 'Your last name cannot exceed 30 characters'],
	},
	email: {
		type: String,
		required: [true, 'Please enter your email'],
		unique: true,
		validate: [validator.isEmail, 'Please enter valid email address'],
	},
	password: {
		type: String,
		required: [true, 'Please enter your password'],
		minlength: [6, 'Your password must be longer than 6 characters'],
		select: false,
	},
	avatar: {
		public_id: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
	},
	role: {
		type: String,
		default: 'user',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
});

// Encrypting password before saving user
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		next()
	}

	this.password = await bcrypt.hash(this.password,  Number(process.env.PASSWORD_SALT) )
})


// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password)
}

// Return JWT token
userSchema.methods.getJwtToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_TIME
	});
} 

// Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
	// Generate token
	const resetToken = crypto.randomBytes(20).toString('hex');

	// Hash and set to resetPasswordToken
	this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

	// Set token expire time
	this.resetPasswordExpire = Date.now() + 30 * 60 * 1000

	return resetToken

}

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
