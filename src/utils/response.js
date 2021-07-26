export const errorResponse = (res, status, resError) => {
	res.status(status).json({
		status,
		error: resError,
	});
};

export const successResponse = (res, status, resMessage, data) => {
	res.status(status).json({
		status,
		message: resMessage,
		data,
	});
};
