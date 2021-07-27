import React, { Fragment, useState, useEffect } from 'react';
import MetaData from '../layout/MetaData';
import axios from 'axios';
import { useAlert } from 'react-alert';

const TrackCourier = () => {
	const [trackingNumber, setTrackingNumber] = useState('');
	const [courierData, setCourierData] = useState(null);
	const alert = useAlert();
	useEffect(() => {}, []);

	const submitHandler = (e) => {
		e.preventDefault();
		axios
			.get(`/api/v1//track/courrier/${trackingNumber}`)
			.then((res) => {
				console.log(res.data);
				setCourierData(res.data.courier);
			})
			.catch((err) => {
				console.log(err);
				alert.error('No courier attached to this tracking number');
			});
	};
	return (
		<Fragment>
			<MetaData title={'Tracking Number'} />

			<div className="row wrapper">
				<div className="col-10 col-lg-5">
					<form className="shadow-lg" onSubmit={submitHandler}>
						<h3 className="mb-3">Tracking Your Courier</h3>

						<div className="form-group">
							<label htmlFor="tracking_field">Tracking Number</label>
							<input
								type="text"
								id="tracking_field"
								className="form-control"
								value={trackingNumber}
								onChange={(e) => setTrackingNumber(e.target.value)}
								required
							/>
						</div>

						<button
							id="login_button"
							type="submit"
							className="btn btn-block "
							style={{ height: '40px' }}
						>
							Submit
						</button>
					</form>
				</div>
			</div>
			<div className="row wrapper">
				{courierData ? (
					<div className="col-12 col-lg-5 mt-5">
						<h4 className="mt-2">From:</h4>
						<p>{courierData.from}</p>
						<hr />
						<h4 className="mt-2">Destination:</h4>
						<p>{courierData.destination}</p>
						<hr />
						<h4 className="mt-2">Weight:</h4>
						<p>{courierData.currentLocation}</p>
						<hr />
					</div>
				) : (
					''
				)}
			</div>
		</Fragment>
	);
};

export default TrackCourier;
