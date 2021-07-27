import axios from 'axios';
import {
	NEW_COURIER_START,
	NEW_COURIER_SUCCESS,
	NEW_COURIER_FAIL,
	ALL_COURIERS_START,
	ALL_COURIERS_SUCCESS,
	ALL_COURIERS_FAIL,
	COURIER_DETAILS_START,
	COURIER_DETAILS_SUCCESS,
	COURIER_DETAILS_FAIL,
	UPDATE_COURIER_REQUEST,
	UPDATE_COURIER_SUCCESS,
	UPDATE_COURIER_FAIL,
	DELETE_COURIER_REQUEST,
	DELETE_COURIER_SUCCESS,
	DELETE_COURIER_FAIL,
	CLEAR_ERRORS,
} from '../constants/courierConstant';

export const newCourier = (courierData) => async (dispatch) => {
	try {
		dispatch({ type: NEW_COURIER_START });
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
		const { data } = await axios.post(
			`/api/v1/new-courrier/`,
			courierData,
			config,
		);
		dispatch({
			type: NEW_COURIER_SUCCESS,
			payload: data,
		});
	} catch (error) {
		console.log(error.response.data.error);
		dispatch({
			type: NEW_COURIER_FAIL,
			payload: error.response.data.error,
		});
	}
};

export const getCouriers = (id) => async (dispatch) => {
	try {
		dispatch({ type: ALL_COURIERS_START });

		const { data } = await axios.get('/api/v1/courriers');
		console.log(data);
		dispatch({
			type: ALL_COURIERS_SUCCESS,
			payload: data.couriers,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: ALL_COURIERS_FAIL,
			payload: error.response.data.error,
		});
	}
};

export const getCourierDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: COURIER_DETAILS_START });

		const { data } = await axios.get(`/api/v1/courrier/${id}`);
		console.log(data);
		dispatch({
			type: COURIER_DETAILS_SUCCESS,
			payload: data.courier,
		});
	} catch (error) {
		console.log(error.response.data.error);
		dispatch({
			type: COURIER_DETAILS_FAIL,
			payload: error.response.data.error,
		});
	}
};

export const updateCourier = (id, courierData) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_COURIER_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.patch(
			`/api/v1/courrier/${id}`,
			courierData,
			config,
		);

		dispatch({
			type: UPDATE_COURIER_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: UPDATE_COURIER_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const deleteCourier = (id) => async (dispatch) => {
	try {
		dispatch({ type: DELETE_COURIER_REQUEST });

		const { data } = await axios.delete(`/api/v1/courrier/${id}`);

		dispatch({
			type: DELETE_COURIER_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: DELETE_COURIER_FAIL,
			payload: error.response.data.message,
		});
	}
};
// Clear Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};
