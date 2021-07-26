import express from 'express';
import bodyParser from 'body-parser';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import cookieParser from 'cookie-parser';
import path from 'path';

import auth from './routes/auth';
import courierRoute from './routes/courrier';
import agencyRoute from './routes/agency';

const app = express();

// Setting up config file
if (process.env.NODE_ENV !== 'PRODUCTION') dotenv.config({ path: '../.env' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({ limits: { fileSize: 1024 * 1024 * 50 } }));

// setting up cloudinary configuration

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// import all routes
app.use('/api/v1/auth', auth);
app.use('/api/v1/', courierRoute);
app.use('/api/v1/', agencyRoute);
app.use(express.static(path.join(__dirname, '../frontend/build')));
app.use('/', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
});

export default app;
