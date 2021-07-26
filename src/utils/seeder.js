import dotenv from 'dotenv'
import User from '../models/user';
import  connectDatabase from '../config/database';
import admins from '../data/admin.json';

// Setting dotenv file
dotenv.config({ path: 'backend/config/config.env' });

connectDatabase();

const seedProducts = async () => {
	try {
		await User.deleteMany();
		process.stdout.write('Admin  is deleted');

		await User.insertMany(admins);
		process.stdout.write('Admin is added.');

		process.exit();
	} catch (error) {
		process.stdout.write(error.message);
		process.exit();
	}
};

seedProducts();
