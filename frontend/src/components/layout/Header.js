import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../actions/userActions';

const Header = () => {
	const alert = useAlert();
	const dispatch = useDispatch();
	const { user, isAuthenticated } = useSelector((state) => state.auth);
	const logoutHandler = () => {
		dispatch(logout());
		alert.success('Logged out successfully.');
	};
	return (
		<Fragment>
			<nav className="navbar navbar-expand-lg navbar-light bg-light">
				<Link className="navbar-brand" to="/" style={{ color: 'white' }}>
					Courier Tracking System
				</Link>
				<button
					className="navbar-toggler"
					type="button"
					data-toggle="collapse"
					data-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>
				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="nav navbar-nav ml-auto">
						<li className="nav-item active">
							<Link className="nav-link" to="/" style={{ color: 'white' }}>
								Home <span className="sr-only">(current)</span>
							</Link>
						</li>
						{user && user.role === 'admin' && (
							<li className="nav-item">
								<Link
									className="nav-link"
									to="/register"
									style={{ color: 'white' }}
								>
									New User
								</Link>
							</li>
						)}
						{user && user.role === 'admin' && (
							<li className="nav-item">
								<Link
									className="nav-link"
									to="/admin/users"
									style={{ color: 'white' }}
								>
									Users
								</Link>
							</li>
						)}
						{isAuthenticated ? (
							<Fragment>
								<li className="nav-item">
									<Link
										className="nav-link"
										to="/document"
										style={{ color: 'white' }}
									>
										New Courier
									</Link>
								</li>

								{user ? (
									<div
										className="dropdown d-inline"
										style={{ marginRight: '0px' }}
									>
										<Link
											to="#!"
											className="btn dropdown-toggle text-white mr-4"
											type="button"
											id="dropDownMenuButton"
											data-toggle="dropdown"
											aria-haspopup="true"
											aria-expanded="false"
										>
											<figure className="avatar avatar-nav">
												<img
													src={user.avatar && user.avatar.url}
													alt={user && user.firstName}
													className="rounded-circle"
												/>
											</figure>
											<span>{user && user.firstName}</span>
										</Link>

										<div
											className="dropdown-menu"
											aria-labelledby="dropDownMenuButton"
										>
											{/* {user && user.role === 'admin' && (
												<Link className="dropdown-item" to="/dashboard">
													Dashboard
												</Link>
											)} */}
											<Link className="dropdown-item" to="/couriers">
												couriers
											</Link>
											{/* <Link className="dropdown-item" to="/me">
												Profile
											</Link> */}
											<Link
												className="dropdown-item text-danger"
												to="/"
												onClick={logoutHandler}
											>
												Logout
											</Link>
										</div>
									</div>
								) : (
									''
								)}
							</Fragment>
						) : (
							<Fragment>
								<li className="nav-item">
									<Link
										className="nav-link"
										to="/login"
										style={{ color: 'white' }}
									>
										Track
									</Link>
								</li>
								<li className="nav-item">
									<Link
										className="nav-link"
										to="/login"
										style={{ color: 'white' }}
									>
										Login
									</Link>
								</li>
							</Fragment>
						)}
					</ul>
				</div>
			</nav>
		</Fragment>
	);
};

export default Header;
