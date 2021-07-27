import React, { Fragment, useState, useEffect } from 'react';
import MetaData from '../layout/MetaData';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { REGISTER_USER_RESET } from '../../constants/userConstants';
import { register, clearErrors } from '../../actions/userActions';

const Register = ({ history, location }) => {
	const [user, setUser] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	});
	const { firstName, lastName, email, password } = user;
	const [avatar, setAvatar] = useState('');
	const [avatarPreview, setAvatarPreview] = useState(
		'/images/default_avatar.jpg',
	);
	const alert = useAlert();
	const dispatch = useDispatch();
	const { success, isAuthenticated, error } = useSelector(
		(state) => state.registerUser,
	);

	const redirect = location.search
		? location.search.split('=')[1]
		: '/admin/users';

	useEffect(() => {
		if (error) {
			alert.error('Some thing went wrong');
			dispatch(clearErrors());
		}
		if (success) {
			history.push(redirect);
			alert.success('User created successfully');
			dispatch({ type: REGISTER_USER_RESET });
		}
	}, [dispatch, success, alert, isAuthenticated, redirect, error, history]);

	const submitHandler = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.set('firstName', firstName);
		formData.set('lastName', lastName);
		formData.set('email', email);
		formData.set('avatar', avatar);
		formData.set('password', password);
		dispatch(register(formData));
	};
	const onChange = (e) => {
		if (e.target.name === 'avatar') {
			const reader = new FileReader();

			reader.onload = () => {
				if (reader.readyState === 2) {
					setAvatarPreview(reader.result);
					setAvatar(reader.result);
				}
			};

			reader.readAsDataURL(e.target.files[0]);
		} else {
			setUser({ ...user, [e.target.name]: e.target.value });
		}
	};

	return (
		<Fragment>
			<MetaData title={'Register User'} />
			<div className="row wrapper">
				<div className="col-10 col-lg-5">
					<form
						className="shadow-lg"
						onSubmit={submitHandler}
						encType="multipart/form-data"
					>
						<h1 className="mb-3">Register</h1>

						<div className="form-group">
							<label htmlFor="name_field">First Name</label>
							<input
								type="text"
								id="name_field"
								className="form-control"
								name="firstName"
								value={firstName}
								onChange={onChange}
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
								onChange={onChange}
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
								onChange={onChange}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="password_field">Password</label>
							<input
								type="password"
								id="password_field"
								className="form-control"
								name="password"
								value={password}
								onChange={onChange}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="avatar_upload">Avatar</label>
							<div className="d-flex align-items-center">
								<div>
									<figure className="avatar mr-3 item-rtl">
										<img
											src={avatarPreview}
											className="rounded-circle"
											alt="Avatar Preview"
										/>
									</figure>
								</div>
								<div className="custom-file">
									<input
										type="file"
										name="avatar"
										className="custom-file-input"
										id="customFile"
										accept="images/*"
										onChange={onChange}
									/>
									<label className="custom-file-label" htmlFor="customFile">
										Choose Avatar
									</label>
								</div>
							</div>
						</div>

						<button
							id="register_button"
							type="submit"
							className="btn btn-block"
						>
							REGISTER
						</button>
					</form>
				</div>
			</div>
		</Fragment>
	);
};

export default Register;
