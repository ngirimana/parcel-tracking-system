import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const userIdFromToken = (token) => {
	const myToken = jwt.verify(token, process.env.JWT_SECRET);

	return myToken.id;
};

export default userIdFromToken;