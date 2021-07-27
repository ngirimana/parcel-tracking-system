import {
	NEW_COURIER_START,
	NEW_COURIER_SUCCESS,
	NEW_COURIER_FAIL,
	NEW_COURIER_RESET,
	ALL_COURIERS_START,
	ALL_COURIERS_SUCCESS,
	ALL_COURIERS_FAIL,
	COURIER_DETAILS_START,
	COURIER_DETAILS_SUCCESS,
	COURIER_DETAILS_FAIL,
	UPDATE_COURIER_REQUEST,
	UPDATE_COURIER_SUCCESS,
	UPDATE_COURIER_FAIL,
	UPDATE_COURIER_RESET,
	DELETE_COURIER_REQUEST,
	DELETE_COURIER_SUCCESS,
	DELETE_COURIER_FAIL,
	DELETE_COURIER_RESET,
	CLEAR_ERRORS,
} from '../constants/courierConstant';

export const courierReducer = (state = { document: {} }, action) => {
	switch (action.type) {
		case NEW_COURIER_START:
			return {
				loading: true,
				document: [],
			};
		case NEW_COURIER_SUCCESS:
			return {
				...state,
				loading: false,
				success: action.payload.success,
				document: action.payload.document,
			};
		case NEW_COURIER_FAIL:
			return {
				...state,
				loading: false,
				document: null,
				error: action.payload,
			};
		case NEW_COURIER_RESET:
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
export const couriersReducer = (state = { couriers: [] }, action) => {
	switch (action.type) {
		case ALL_COURIERS_START:
			return {
				loading: true,
				couriers: [],
			};

		case ALL_COURIERS_SUCCESS:
			return {
				loading: false,
				couriers: action.payload,
			};

		case ALL_COURIERS_FAIL:
			return {
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
export const courierDetailsReducer = (state = { courier: {} }, action) => {
	switch (action.type) {
		case COURIER_DETAILS_START:
			return {
				...state,
				loading: true,
			};

		case COURIER_DETAILS_SUCCESS:
			return {
				loading: false,
				courier: action.payload,
			};

		case COURIER_DETAILS_FAIL:
			return {
				...state,
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
export const courierUpdateAndDeleteReducer = (state = {}, action) => {
	switch (action.type) {
		case DELETE_COURIER_REQUEST:
		case UPDATE_COURIER_REQUEST:
			return {
				...state,
				loading: true,
			};

		case DELETE_COURIER_SUCCESS:
			return {
				...state,
				loading: false,
				isDeleted: action.payload,
			};

		case UPDATE_COURIER_SUCCESS:
			return {
				...state,
				loading: false,
				isUpdated: action.payload,
			};

		case DELETE_COURIER_FAIL:
		case UPDATE_COURIER_FAIL:
			return {
				...state,
				error: action.payload,
			};

		case DELETE_COURIER_RESET:
			return {
				...state,
				isDeleted: false,
			};

		case UPDATE_COURIER_RESET:
			return {
				...state,
				isUpdated: false,
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
