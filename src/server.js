import dotenv from 'dotenv';
import app from './app';
import connectDatabase from './config/database';

/**
 * Handle Uncaught exceptions
 */
process.on('uncaughtException', err => {
	process.stdout.write(`ERROR: ${err.stack}`);
	process.stdout.write('Shutting down due to uncaught exception');
	process.exit(1)
})



// Setting up config file
if (process.env.NODE_ENV !== 'PRODUCTION') dotenv.config({ path: '../.env' });

const port = process.env.PORT || 5000;
connectDatabase()
app.listen(port, () =>
	process.stdout.write(`Listening on port ${port} ... \n`),
);



