import {
	NEW_AGENCY_START,
	NEW_AGENCY_SUCCESS,
	NEW_AGENCY_FAIL,
	NEW_AGENCY_RESET,
	ALL_AGENCIES_START,
	ALL_AGENCIES_SUCCESS,
	ALL_AGENCIES_FAIL,
	AGENCY_DETAILS_START,
	AGENCY_DETAILS_SUCCESS,
	AGENCY_DETAILS_FAIL,
	CLEAR_ERRORS,
} from '../constants/agencyConstants';

export const agencyReducer = (state = { agency: {} }, action) => {
	switch (action.type) {
		case NEW_AGENCY_START:
			return {
				loading: true,
				agency: [],
			};
		case NEW_AGENCY_SUCCESS:
			return {
				...state,
				loading: false,
				success: action.payload.success,
				agency: action.payload,
			};
		case NEW_AGENCY_FAIL:
			return {
				...state,
				loading: false,
				agency: null,
				error: action.payload,
			};
		case NEW_AGENCY_RESET:
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
export const agenciesReducer = (state = { agencies: [] }, action) => {
	switch (action.type) {
		case ALL_AGENCIES_START:
			return {
				loading: true,
				agencies: [],
			};

		case ALL_AGENCIES_SUCCESS:
			return {
				loading: false,
				agencies: action.payload,
			};

		case ALL_AGENCIES_FAIL:
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
export const agencyDetailsReducer = (state = { agency: {} }, action) => {
	switch (action.type) {
		case AGENCY_DETAILS_START:
			return {
				...state,
				loading: true,
			};

		case AGENCY_DETAILS_SUCCESS:
			return {
				loading: false,
				agency: action.payload,
			};

		case AGENCY_DETAILS_FAIL:
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
