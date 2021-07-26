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
	UPDATE_USER_RESET,
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

export const authReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case LOGIN_START:
		case LOAD_USER_START:
			return {
				loading: true,
				isAuthenticated: false,
			};
		case LOGIN_SUCCESS:
		case LOAD_USER_SUCCESS:
			return {
				...state,
				loading: false,
				isAuthenticated: true,
				user: action.payload,
			};
		case LOGOUT_SUCCESS:
			return {
				loading: false,
				isAuthenticated: false,
				user: null,
			};
		case LOAD_USER_FAIL:
			return {
				loading: false,
				isAuthenticated: false,
				user: null,
				error: action.payload,
			};

		case LOGOUT_FAIL:
			return {
				...state,
				error: action.payload,
			};
		case LOGIN_FAIL:
			return {
				...state,
				loading: false,
				isAuthenticated: false,
				user: null,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};
export const usersListReducers = (state = { users: {} }, action) => {
	// eslint-disable-next-line default-case
	switch (action.type) {
		case GET_ALL_USERS_START:
			return {
				loading: true,
				users: null,
			};
		case GET_ALL_USERS_SUCCESS:
			return {
				loading: false,
				users: action.payload,
			};
		case GET_ALL_USERS_FAIL: {
			return {
				loading: false,
				users: null,
				error: action.payload,
			};
		}
		default:
			return state;
	}
};
export const userReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_USER_REQUEST:
		case DELETE_USER_REQUEST:
			return {
				...state,
				loading: true,
			};

		case UPDATE_USER_SUCCESS:
			return {
				...state,
				loading: false,
				isUpdated: action.payload,
			};

		case DELETE_USER_SUCCESS:
			return {
				...state,
				loading: false,
				isDeleted: action.payload,
			};

		case UPDATE_USER_RESET:
			return {
				...state,
				isUpdated: false,
			};

		case DELETE_USER_RESET:
			return {
				...state,
				isDeleted: false,
			};

		case UPDATE_USER_FAIL:
		case DELETE_USER_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};
export const userDetailsReducer = (state = { user: {} }, action) => {
	switch (action.type) {
		case USER_DETAILS_REQUEST:
			return {
				...state,
				loading: true,
			};

		case USER_DETAILS_SUCCESS:
			return {
				...state,
				loading: false,
				user: action.payload,
			};

		case USER_DETAILS_FAIL:
			return {
				...state,
				loading: false,
				error: action.payload,
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};

		default:
			return state;
	}
};
