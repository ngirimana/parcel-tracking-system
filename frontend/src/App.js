import { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Login from './components/user/Login';
import Register from './components/user/Register';
import NewDocument from './components/Courier/NewCourier';
import CouriersList from './components/Courier/CouriersList';
import ProtectedRoute from './components/route/ProtectedRoute';
import CourierDetails from './components/Courier/CourierDetails';
import UsersList from './components/user/UsersList';
import UpdateUser from './components/user/UpdateUser';
import UpdateCourier from './components/Courier/UpdateCourier';
import TrackCourier from './components/Courier/TrackCourier';
// import Home from './components/Home';
import { loadUser } from './actions/userActions';
import store from './store';
function App() {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);
	return (
		<Router>
			<div className="App">
				<Header />
				<div className="container container-fluid">
					<Route path="/" component={Login} exact />
					<Route path="/login" component={Login} />
					<Route path="/track-courier" component={TrackCourier} />

					<ProtectedRoute
						path="/register"
						isAdmin={true}
						component={Register}
					/>
					<ProtectedRoute
						path="/admin/users"
						isAdmin={true}
						component={UsersList}
						exact
					/>
					<ProtectedRoute
						path="/admin/user/:id"
						isAdmin={true}
						component={UpdateUser}
						exact
					/>
					<ProtectedRoute
						path="/update/courier/:id"
						component={UpdateCourier}
						exact
					/>
					<ProtectedRoute path="/document" component={NewDocument} exact />
					<ProtectedRoute path="/couriers" component={CouriersList} exact />
					<ProtectedRoute path="/courier/:id" component={CourierDetails} />
				</div>

				<Footer />
			</div>
		</Router>
	);
}

export default App;
