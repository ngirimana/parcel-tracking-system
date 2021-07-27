import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const connectDatabase = () => {
	mongoose
		.connect(process.env.DB_LOCAL_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		})
		.then((con) =>
			process.stdout.write(
				`MongoDB Database Connected successfully with HOST: ${con.connection.host}`,
			),
		);
};

export default connectDatabase;
