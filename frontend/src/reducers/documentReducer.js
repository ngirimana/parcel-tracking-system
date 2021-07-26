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
