import {
	REGISTER_USER_START,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAIL,
	REGISTER_USER_RESET,
	CLEAR_ERRORS,
} from '../constants/userConstants';

export const registerReducer = (state = {}, action) => {
	switch (action.type) {
		case REGISTER_USER_START:
			return {
				loading: true,
			};

		case REGISTER_USER_SUCCESS:
			return {
				...state,
				loading: false,
				isAuthenticated: true,
				success: true,
			};

		case REGISTER_USER_FAIL:
			return {
				...state,
				loading: false,
				isAuthenticated: false,
				error: action.payload,
			};
		case REGISTER_USER_RESET:
			return {
				...state,
				success: false,
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
