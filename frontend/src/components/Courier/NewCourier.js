import React, { Fragment, useState, useEffect } from 'react';
import MetaData from '../layout/MetaData';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { newCourier, clearErrors } from '../../actions/courierActions';
import { NEW_COURIER_RESET } from '../../constants/courierConstant';

const NewCourier = ({ history, location }) => {
	const [courier, setCourier] = useState({
		firstName: '',
		lastName: '',
		from: '',
		destination: '',
		weight: '',
		phone: '',
		receiver: '',
		email: '',
	});
	const {
		firstName,
		lastName,
		from,
		phone,
		destination,
		weight,
		receiver,
		email,
	} = courier;
	const [images, setImages] = useState([]);
	const [imagesPreview, setImagesPreview] = useState([]);
	const alert = useAlert();
	const dispatch = useDispatch();
	const { success, error } = useSelector((state) => state.newDocument);

	useEffect(() => {
		if (error) {
			alert.error('Some thing went wrong,try again!');
			dispatch(clearErrors());
		}

		if (success) {
			history.push('/couriers');
			alert.success('Courier created successfully');
			dispatch({ type: NEW_COURIER_RESET });
		}
	}, [dispatch, alert, success, error, history]);

	const submitHandler = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.set('firstName', firstName);
		formData.set('lastName', lastName);
		formData.set('from', from);
		formData.set('email', email);
		formData.set('phone', phone);
		formData.set('phone', phone);
		formData.set('destination', destination);
		formData.set('weight', weight);
		formData.set('receiver', receiver);
		images.forEach((image) => {
			formData.append('images', image);
		});
		console.log(formData.getAll('images').length);

		dispatch(newCourier(formData));
	};
	const onChange = (e) => {
		if (e.target.name === 'images') {
			const files = Array.from(e.target.files);

			setImagesPreview([]);
			setImages([]);

			files.forEach((file) => {
				const reader = new FileReader();

				reader.onload = () => {
					if (reader.readyState === 2) {
						setImagesPreview((oldArray) => [...oldArray, reader.result]);
						setImages((oldArray) => [...oldArray, reader.result]);
					}
				};

				reader.readAsDataURL(file);
			});
		} else {
			setCourier({ ...courier, [e.target.name]: e.target.value });
		}
	};

	return (
		<Fragment>
			<MetaData title={'New Courier'} />
			<div className="row wrapper">
				<div className="col-10 col-lg-5">
					<form
						className="shadow-lg"
						onSubmit={submitHandler}
						encType="multipart/form-data"
					>
						<h1 className="mb-3">New Courier</h1>

						<div className="form-group">
							<label htmlFor="name_field">First Name</label>
							<input
								type="text"
								id="name_field"
								className="form-control"
								name="firstName"
								value={firstName}
								data-toggle="tooltip"
								data-placement="bottom"
								title="First Name"
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
								data-toggle="tooltip"
								data-placement="bottom"
								title="Last Name"
								onChange={onChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="password_field">Email</label>
							<input
								type="email"
								id="password_field"
								className="form-control"
								name="email"
								value={email}
								data-toggle="tooltip"
								data-placement="bottom"
								title="Email"
								onChange={onChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="phone_field">Phone</label>
							<input
								type="phone"
								id="phone_field"
								className="form-control"
								name="phone"
								value={phone}
								data-toggle="tooltip"
								data-placement="bottom"
								title="Phone Number"
								onChange={onChange}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="email_field">From</label>
							<input
								type="text"
								id="from_field"
								className="form-control"
								name="from"
								value={from}
								data-toggle="tooltip"
								data-placement="bottom"
								title="From"
								onChange={onChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="email_field">Destination</label>
							<input
								type="text"
								id="dest_field"
								className="form-control"
								name="destination"
								value={destination}
								data-toggle="tooltip"
								data-placement="bottom"
								title="Destination"
								onChange={onChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="email_field">Weight</label>
							<input
								type="text"
								id="weight_field"
								className="form-control"
								name="weight"
								value={weight}
								data-toggle="tooltip"
								data-placement="bottom"
								title="Weight"
								onChange={onChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="email_field">Receiver</label>
							<input
								type="text"
								id="receiver_field"
								className="form-control"
								name="receiver"
								value={receiver}
								data-toggle="tooltip"
								data-placement="bottom"
								title="Receiver"
								onChange={onChange}
							/>
						</div>
						<div className="form-group">
							<label>Images</label>

							<div className="custom-file">
								<input
									type="file"
									name="images"
									className="custom-file-input"
									id="customFile"
									onChange={onChange}
									data-toggle="tooltip"
									data-placement="bottom"
									title="One image should be less than 1MB"
									multiple
								/>
								<label className="custom-file-label" htmlFor="customFile">
									Choose Images
								</label>
							</div>

							{imagesPreview.map((img) => (
								<img
									src={img}
									key={img}
									alt="Images Preview"
									className="mt-3 mr-2"
									width="55"
									height="52"
								/>
							))}
						</div>

						<button
							id="register_button"
							type="submit"
							className="btn btn-block "
						>
							Submit
						</button>
					</form>
				</div>
			</div>
		</Fragment>
	);
};

export default NewCourier;
