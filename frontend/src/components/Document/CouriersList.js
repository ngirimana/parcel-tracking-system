import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';

import MetaData from '../layout/MetaData';
import Spinner from '../layout/Spinner';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { getDocuments, clearErrors } from '../../actions/documentActions';

const CouriersList = ({ history }) => {
	const alert = useAlert();
	const dispatch = useDispatch();

	const { loading, error, couriers } = useSelector((state) => state.documents);

	useEffect(() => {
		dispatch(getDocuments());

		if (error) {
			alert.error(error);
			dispatch(clearErrors());
		}
	}, [dispatch, alert, error, history]);

	const setDocuments = () => {
		const data = {
			columns: [
				{
					label: 'First Name',
					field: 'firstName',
					sort: 'asc',
				},
				{
					label: 'Last Name',
					field: 'lastName',
					sort: 'asc',
				},
				{
					label: 'Phone',
					field: 'phone',
					sort: 'asc',
				},
				{
					label: 'Email',
					field: 'email',
					sort: 'asc',
				},
				{
					label: 'Receiver',
					field: 'receiver',
					sort: 'asc',
				},
				{
					label: 'Destination',
					field: 'destination',
					sort: 'asc',
				},

				{
					label: 'Actions',
					field: 'actions',
				},
			],
			rows: [],
		};

		couriers &&
			couriers.forEach((document) => {
				data.rows.push({
					firstName: document.firstName,
					lastName: document.lastName,
					phone: document.phone,
					email: document.email,
					receiver: document.receiver,
					destination: document.destination,
					actions: (
						<Fragment>
							<Link
								to={`/courier/${document._id}`}
								className="btn btn-primary py-1 px-2"
							>
								<i className="fa fa-eye"></i>
							</Link>
							<Link
								to={`/document/${document._id}`}
								className="btn btn-primary py-1 px-2 ml-2"
							>
								<i className="fa fa-edit"></i>
							</Link>
							<button className="btn btn-danger py-1 px-2 ml-2">
								<i className="fa fa-trash"></i>
							</button>
						</Fragment>
					),
				});
			});

		return data;
	};

	return (
		<Fragment>
			<MetaData title={'All Couriers'} />
			{loading ? (
				<Spinner />
			) : (
				<div className="row">
					<div className="col-12 col-md-12">
						<Fragment>
							<h1 className="my-5">All Couriers</h1>

							<MDBDataTable
								data={setDocuments()}
								className="px-3"
								bordered
								striped
								hover
							/>
						</Fragment>
					</div>
				</div>
			)}
		</Fragment>
	);
};

export default CouriersList;
