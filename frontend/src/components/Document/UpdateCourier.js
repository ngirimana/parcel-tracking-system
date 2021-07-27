import React, { Fragment, useState, useEffect } from 'react';

import MetaData from '../layout/MetaData';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import {
	updateCourier,
	getDocumentDetails,
	clearErrors,
} from '../../actions/documentActions';
import { UPDATE_COURIER_RESET } from '../../constants/documentConstant';

const UpdateCourier = ({ match, history }) => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [from, setFrom] = useState('');
	const [phone, setPhone] = useState('');
	const [destination, setDestination] = useState('');
	const [weight, setWeight] = useState('');
	const [receiver, setReceiver] = useState('');
	const [email, setEmail] = useState('');
	const [images, setImages] = useState([]);

	const [oldImages, setOldImages] = useState([]);
	const [imagesPreview, setImagesPreview] = useState([]);

	const alert = useAlert();
	const dispatch = useDispatch();

	const { error, courier } = useSelector((state) => state.documentDetails);
	const { loading, error: updateError, isUpdated } = useSelector(
		(state) => state.courier,
	);

	const courierId = match.params.id;

	useEffect(() => {
		if (courier && courier._id !== courierId) {
			dispatch(getDocumentDetails(courierId));
		} else {
			setFirstName(courier.firstName);
			setLastName(courier.lastName);
			setDestination(courier.destination);
			setFrom(courier.from);
			setEmail(courier.email);
			setPhone(courier.phone);
			setWeight(courier.weight);
			setReceiver(courier.receiver);
			setOldImages(courier.images);
		}

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}

		if (updateError) {
			alert.error(updateError);
			dispatch(clearErrors());
		}

		if (isUpdated) {
			history.push('/couriers');
			alert.success('Courier updated successfully');
			dispatch({ type: UPDATE_COURIER_RESET });
		}
	}, [
		dispatch,
		alert,
		error,
		isUpdated,
		history,
		updateError,
		courier,
		courierId,
	]);

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

		dispatch(updateCourier(courier._id, formData));
	};

	const onChange = (e) => {
		const files = Array.from(e.target.files);

		setImagesPreview([]);
		setImages([]);
		setOldImages([]);

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
	};

	return (
		<Fragment>
			<MetaData title={'Update ourier'} />
			<div className="row">
				<div className="col-12 col-md-12">
					<Fragment>
						<div className="wrapper my-5">
							<form
								className="shadow-lg"
								onSubmit={submitHandler}
								encType="multipart/form-data"
							>
								<h1 className="mb-3">Update Courier</h1>

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
										onChange={(e) => setFirstName(e.target.value)}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="last_name_field">Last Name</label>
									<input
										type="text"
										id="last_name_field"
										className="form-control"
										name="lastName"
										value={lastName}
										data-toggle="tooltip"
										data-placement="bottom"
										title="Last Name"
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
										data-toggle="tooltip"
										data-placement="bottom"
										title="Email"
										onChange={(e) => setEmail(e.target.value)}
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
										onChange={(e) => setPhone(e.target.value)}
									/>
								</div>

								<div className="form-group">
									<label htmlFor="from_field">From</label>
									<input
										type="text"
										id="from_field"
										className="form-control"
										name="from"
										value={from}
										data-toggle="tooltip"
										data-placement="bottom"
										title="From"
										onChange={(e) => setFrom(e.target.value)}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="dest_field">Destination</label>
									<input
										type="text"
										id="dest_field"
										className="form-control"
										name="destination"
										value={destination}
										data-toggle="tooltip"
										data-placement="bottom"
										title="Destination"
										onChange={(e) => setDestination(e.target.value)}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="weight_field">Weight</label>
									<input
										type="text"
										id="weight_field"
										className="form-control"
										name="weight"
										value={weight}
										data-toggle="tooltip"
										data-placement="bottom"
										title="Weight"
										onChange={(e) => setWeight(e.target.value)}
									/>
								</div>
								<div className="form-group">
									<label htmlFor="receiver_field">Receiver</label>
									<input
										type="text"
										id="receiver_field"
										className="form-control"
										name="receiver"
										value={receiver}
										data-toggle="tooltip"
										data-placement="bottom"
										title="Receiver"
										onChange={(e) => setReceiver(e.target.value)}
									/>
								</div>

								<div className="form-group">
									<label>Images</label>

									<div className="custom-file">
										<input
											type="file"
											name="product_images"
											className="custom-file-input"
											id="customFile"
											onChange={onChange}
											multiple
										/>
										<label className="custom-file-label" htmlFor="customFile">
											Choose Images
										</label>
									</div>

									{oldImages &&
										oldImages.map((img) => (
											<img
												key={img}
												src={img.url}
												alt={img.url}
												className="mt-3 mr-2"
												width="55"
												height="52"
											/>
										))}

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
									id="login_button"
									type="submit"
									className="btn btn-block py-3"
									disabled={loading ? true : false}
								>
									UPDATE
								</button>
							</form>
						</div>
					</Fragment>
				</div>
			</div>
		</Fragment>
	);
};

export default UpdateCourier;
