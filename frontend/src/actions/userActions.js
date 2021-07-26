import axios from 'axios';
import {
	LOGIN_START,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOAD_USER_START,
	LOAD_USER_SUCCESS,
	GET_ALL_USERS_START,
	GET_ALL_USERS_SUCCESS,
	GET_ALL_USERS_FAIL,
	UPDATE_USER_REQUEST,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_FAIL,
	REGISTER_USER_START,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAIL,
	USER_DETAILS_REQUEST,
	USER_DETAILS_SUCCESS,
	USER_DETAILS_FAIL,
	DELETE_USER_REQUEST,
	DELETE_USER_SUCCESS,
	DELETE_USER_RESET,
	DELETE_USER_FAIL,
	LOAD_USER_FAIL,
	LOGOUT_SUCCESS,
	LOGOUT_FAIL,
	CLEAR_ERRORS,
} from '../constants/userConstants';

// Register User
export const register = (userData) => async (dispatch) => {
	try {
		dispatch({ type: REGISTER_USER_START });
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
		const { data } = await axios.post(
			'/api/v1/auth/register',
			userData,
			config,
		);
		dispatch({
			type: REGISTER_USER_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: REGISTER_USER_FAIL,
			payload: error,
		});
	}
};

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: LOGIN_START });
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.post(
			'/api/v1/auth/login',
			{ email, password },
			config,
		);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: data.user,
		});
	} catch (error) {
		dispatch({
			type: LOGIN_FAIL,
			payload: error.response.data.error,
		});
	}
};
// Load user
export const loadUser = () => async (dispatch) => {
	try {
		dispatch({ type: LOAD_USER_START });

		const { data } = await axios.get('/api/v1/auth/me');

		dispatch({
			type: LOAD_USER_SUCCESS,
			payload: data.user,
		});
	} catch (error) {
		dispatch({
			type: LOAD_USER_FAIL,
			payload: error.response.data.error,
		});
	}
};
export const getAllUsers = () => async (dispatch) => {
	try {
		dispatch({ type: GET_ALL_USERS_START });
		const { data } = await axios.get('/api/v1/auth/admin/users');
		console.log(data);
		dispatch({
			type: GET_ALL_USERS_SUCCESS,
			payload: data.users,
		});
	} catch (error) {
		console.log(error);
		dispatch({
			type: GET_ALL_USERS_FAIL,
			payload: error.response.data.error,
		});
	}
};
// Get user details - ADMIN
export const getUserDetails = (id) => async (dispatch) => {
	try {
		dispatch({ type: USER_DETAILS_REQUEST });

		const { data } = await axios.get(`/api/v1/auth/admin/user/${id}`);
		console.log(data.user);

		dispatch({
			type: USER_DETAILS_SUCCESS,
			payload: data.user,
		});
	} catch (error) {
		dispatch({
			type: USER_DETAILS_FAIL,
			payload: error.response.data.message,
		});
	}
};
// Update user - ADMIN
export const updateUser = (id, userData) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_USER_REQUEST });

		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const { data } = await axios.patch(
			`/api/v1/auth/admin/user/${id}`,
			userData,
			config,
		);

		dispatch({
			type: UPDATE_USER_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: UPDATE_USER_FAIL,
			payload: error.response.data.message,
		});
	}
};
// Delete user - ADMIN
export const deleteUser = (id) => async (dispatch) => {
	try {
		dispatch({ type: DELETE_USER_REQUEST });

		const { data } = await axios.delete(`/api/v1/auth/admin/user/${id}`);

		dispatch({
			type: DELETE_USER_SUCCESS,
			payload: data.success,
		});
	} catch (error) {
		dispatch({
			type: DELETE_USER_FAIL,
			payload: error.response.data.message,
		});
	}
};

//
// Logout user
export const logout = () => async (dispatch) => {
	try {
		await axios.get('/api/v1/auth/logout');

		dispatch({
			type: LOGOUT_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: LOGOUT_FAIL,
			payload: error.response.data.message,
		});
	}
};

// CLEAR ERRORS
export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};
