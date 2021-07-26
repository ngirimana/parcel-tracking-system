import axios from 'axios';
import {
	NEW_AGENCY_START,
	NEW_AGENCY_SUCCESS,
	NEW_AGENCY_FAIL,
	ALL_AGENCIES_START,
	ALL_AGENCIES_SUCCESS,
	ALL_AGENCIES_FAIL,
	AGENCY_DETAILS_START,
	AGENCY_DETAILS_SUCCESS,
	AGENCY_DETAILS_FAIL,
	CLEAR_ERRORS,
} from '../constants/agencyConstants';

export const newAgency = (agencyData) => async (dispatch) => {
	try {
		dispatch({ type: NEW_AGENCY_START });
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.post(`/api/v1/new-agency`, agencyData, config);
		dispatch({
			type: NEW_AGENCY_SUCCESS,
			payload: data.agency,
		});
	} catch (error) {
		console.log(error.response.data.error);
		dispatch({
			type: NEW_AGENCY_FAIL,
			payload: error.response.data.error,
		});
	}
};

export const getAgencies = () => async (dispatch) => {
	try {
		dispatch({ type: ALL_AGENCIES_START });

		const { data } = await axios.get('/api/v1/agencies');
		console.log(data);
		dispatch({
			type: ALL_AGENCIES_SUCCESS,
			payload: data.agencies,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: ALL_AGENCIES_FAIL,
			payload: error.response.data.error,
		});
	}
};

export const getAgencyDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: AGENCY_DETAILS_START });

		const { data } = await axios.get(`/api/v1/agency/${id}`);
		console.log(data);
		dispatch({
			type: AGENCY_DETAILS_SUCCESS,
			payload: data.agency,
		});
	} catch (error) {
		console.log(error.response.data.error);
		dispatch({
			type: AGENCY_DETAILS_FAIL,
			payload: error.response.data.error,
		});
	}
};
// Clear Errors
export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};
