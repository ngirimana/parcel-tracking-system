import React, { useEffect, Fragment } from 'react';
import { useAlert } from 'react-alert';
import { Carousel } from 'react-bootstrap';
import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getCourierDetails, clearErrors } from '../../actions/courierActions';

const CourierDetails = ({ match }) => {
	const alert = useAlert();
	const dispatch = useDispatch();
	const { loading, error, courier } = useSelector(
		(state) => state.documentDetails,
	);
	useEffect(() => {
		dispatch(getCourierDetails(match.params.id));
		console.log(match.params.id);

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch, alert, error, match.params.id]);

	return (
		<Fragment>
			{loading ? (
				<Loader />
			) : (
				<Fragment>
					<MetaData title={courier && match.params.id} />
					{courier ? (
						<div className="row f-flex justify-content-around">
							<div className="col-12 col-lg-5 img-fluid" id="product_image">
								<Carousel pause="hover">
									{courier.images &&
										courier.images.map((image) => (
											<Carousel.Item key={image.public_id}>
												<img
													className="d-block w-100"
													src={image.url}
													alt={courier._id}
													height="500"
													width="500"
												/>
											</Carousel.Item>
										))}
								</Carousel>
							</div>

							<div className="col-12 col-lg-5 mt-5">
								<p id="product_id">Courier # {courier._id}</p>
								<hr />
								<h5 className="mt-2">Owner's first name:</h5>
								<p>{courier.firstName}</p>
								<hr />
								<h4 className="mt-2">Owner's last name:</h4>
								<p>{courier.lastName}</p>
								<hr />
								<h4 className="mt-2">Owner's Phone Number:</h4>
								<p>{courier.Phone}</p>
								<hr />
								<h4 className="mt-2">Owner's email address:</h4>
								<p>{courier.email}</p>
								<hr />
								<h4 className="mt-2">From:</h4>
								<p>{courier.from}</p>
								<hr />
								<h4 className="mt-2">Destination:</h4>
								<p>{courier.destination}</p>
								<hr />
								<h4 className="mt-2">Weight:</h4>
								<p>{courier.weight}</p>
								<hr />
								<h4 className="mt-2">Receiver:</h4>
								<p>{courier.receiver}</p>
								<hr />
							</div>
						</div>
					) : (
						''
					)}
				</Fragment>
			)}
		</Fragment>
	);
};

export default CourierDetails;
