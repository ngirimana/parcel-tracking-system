import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
	const transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'codeeverywhere10@gmail.com',
			pass: 'safari1006',
		},
	});

	const message = {
		from: `${process.env.SMTP_FROM_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
		to: options.email,
		subject: options.subject,
		text: options.message,
	};

	await transporter.sendMail(message);
};
// Step 1: Creating the transporter




export default sendEmail;
