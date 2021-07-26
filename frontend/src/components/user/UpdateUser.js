import React, { Fragment, useState, useEffect } from 'react';

import MetaData from '../layout/MetaData';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import {
	updateUser,
	getUserDetails,
	clearErrors,
} from '../../actions/userActions';
import { UPDATE_USER_RESET } from '../../constants/userConstants';

const UpdateUser = ({ history, match }) => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [role, setRole] = useState('');

	const alert = useAlert();
	const dispatch = useDispatch();

	const { error, isUpdated } = useSelector((state) => state.user);
	const { user } = useSelector((state) => state.userDetails);

	const userId = match.params.id;

	useEffect(() => {
		console.log(user && user._id !== userId);
		console.log(isUpdated);
		if (user && user._id !== userId) {
			dispatch(getUserDetails(userId));
		} else {
			setFirstName(user.firstName);
			setLastName(user.lastName);
			setEmail(user.email);
			setRole(user.role);
		}

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			alert.success('User updated successfully');

			history.push('/admin/users');

			dispatch({
				type: UPDATE_USER_RESET,
			});
		}
	}, [dispatch, alert, error, history, isUpdated, userId, user]);

	const submitHandler = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.set('firstName', firstName);
		formData.set('lastName', lastName);
		formData.set('email', email);
		formData.set('role', role);

		console.log(formData);

		dispatch(updateUser(user._id, formData));
	};

	return (
		<Fragment>
			<MetaData title={`Update User`} />
			<div className="row">
				<div className="col-12 col-md-12">
					<div className="row wrapper">
						<div className="col-10 col-lg-5">
							<form className="shadow-lg" onSubmit={submitHandler}>
								<h1 className="mt-2 mb-5">Update User</h1>

								<div className="form-group">
									<label htmlFor="name_field">First Name</label>
									<input
										type="text"
										id="name_field"
										className="form-control"
										name="firstName"
										value={firstName}
										onChange={(e) => setFirstName(e.target.value)}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="email_field">Last Name</label>
									<input
										type="text"
										id="name_field"
										className="form-control"
										name="lastName"
										value={lastName}
										onChange={(e) => setLastName(e.target.value)}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="email_field">Email</label>
									<input
										type="email"
										id="email_field"
										className="form-control"
										name="email"
										value={email}
										onChange={(e) => setEmail(e.target.value)}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="role_field">Role</label>

									<select
										id="role_field"
										className="form-control"
										name="role"
										value={role}
										onChange={(e) => setRole(e.target.value)}
									>
										<option value="user">user</option>
										<option value="admin">admin</option>
									</select>
								</div>

								<button
									type="submit"
									className="btn update-btn btn-block mt-4 mb-3"
									onClick={submitHandler}
								>
									Update
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</Fragment>
	);
};

export default UpdateUser;
