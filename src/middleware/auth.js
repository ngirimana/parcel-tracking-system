import jwt from "jsonwebtoken";
import User from '../models/user';
import {errorResponse } from '../utils/response';

// Checks if user is authenticated or not
export const isAuthenticatedUser = async (req, res, next) => {
	const { token } = req.cookies

	try {  
	

		if (!token) {
			return errorResponse(res,401,'Login first to access this resource.')
		}
	
		const decoded = jwt.verify(token, process.env.JWT_SECRET)
		req.user = await User.findById(decoded.id);
		
		if (!req.user) {
			return errorResponse(res,401,'Register first to access this resource.')
		}

		next()
	} catch (err) {
		return errorResponse(res,400,err.message)
	}

	
}

// Handling users roles
export const authorizeRoles = (...roles) => (req, res, next) => {
	if (!roles.includes(req.user.role)) {
		return errorResponse(res, 403, `Role (${req.user.role}) is not allowed to access this resource`,)
	}
	
	next()
}