import {
	NEW_DOCUMENT_START,
	NEW_DOCUMENT_SUCCESS,
	NEW_DOCUMENT_FAIL,
	NEW_DOCUMENT_RESET,
	ALL_DOCUMENTS_START,
	ALL_DOCUMENTS_SUCCESS,
	ALL_DOCUMENTS_FAIL,
	DOCUMENT_DETAILS_START,
	DOCUMENT_DETAILS_SUCCESS,
	DOCUMENT_DETAILS_FAIL,
	UPDATE_COURIER_REQUEST,
	UPDATE_COURIER_SUCCESS,
	UPDATE_COURIER_FAIL,
	UPDATE_COURIER_RESET,
	DELETE_COURIER_REQUEST,
	DELETE_COURIER_SUCCESS,
	DELETE_COURIER_FAIL,
	DELETE_COURIER_RESET,
	CLEAR_ERRORS,
} from '../constants/documentConstant';

export const documentReducer = (state = { document: {} }, action) => {
	switch (action.type) {
		case NEW_DOCUMENT_START:
			return {
				loading: true,
				document: [],
			};
		case NEW_DOCUMENT_SUCCESS:
			return {
				...state,
				loading: false,
				success: action.payload.success,
				document: action.payload.document,
			};
		case NEW_DOCUMENT_FAIL:
			return {
				...state,
				loading: false,
				document: null,
				error: action.payload,
			};
		case NEW_DOCUMENT_RESET:
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
export const documentsReducer = (state = { couriers: [] }, action) => {
	switch (action.type) {
		case ALL_DOCUMENTS_START:
			return {
				loading: true,
				couriers: [],
			};

		case ALL_DOCUMENTS_SUCCESS:
			return {
				loading: false,
				couriers: action.payload,
			};

		case ALL_DOCUMENTS_FAIL:
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
export const documentDetailsReducer = (state = { courier: {} }, action) => {
	switch (action.type) {
		case DOCUMENT_DETAILS_START:
			return {
				...state,
				loading: true,
			};

		case DOCUMENT_DETAILS_SUCCESS:
			return {
				loading: false,
				courier: action.payload,
			};

		case DOCUMENT_DETAILS_FAIL:
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
