import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { authReducer } from './reducers/userReducer';
import { registerReducer } from './reducers/registerUserReducer';
import {
	usersListReducers,
	userReducer,
	userDetailsReducer,
} from './reducers/userReducer';
import {
	agenciesReducer,
	agencyDetailsReducer,
	agencyReducer,
} from './reducers/agencyReducer';
import {
	courierReducer,
	couriersReducer,
	courierDetailsReducer,
	courierUpdateAndDeleteReducer,
} from './reducers/courierReducer';

const reducer = combineReducers({
	auth: authReducer,
	registerUser: registerReducer,
	newDocument: courierReducer,
	usersList: usersListReducers,
	documents: couriersReducer,
	documentDetails: courierDetailsReducer,
	newAgency: agencyReducer,
	agencies: agenciesReducer,
	agencyDetails: agencyDetailsReducer,
	userDetails: userDetailsReducer,
	user: userReducer,
	courier: courierUpdateAndDeleteReducer,
});
const middleware = [thunk];
const store = createStore(
	reducer,
	composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
