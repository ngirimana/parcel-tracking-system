import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
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
