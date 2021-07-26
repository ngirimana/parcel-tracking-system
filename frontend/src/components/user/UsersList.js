import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MDBDataTable } from 'mdbreact';

import MetaData from '../layout/MetaData';
import Spinner from '../layout/Spinner';
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, clearErrors } from '../../actions/userActions';
import { DELETE_USER_RESET } from '../../constants/userConstants';

import axios from 'axios';

const UsersList = ({ history }) => {
	const alert = useAlert();
	const { isDeleted } = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [usersList, setUserList] = useState([]);

	// const { loading, error, users } = useSelector((state) => state.usersList);

	useEffect(() => {
		axios
			.get('/api/v1/auth/admin/users')
			.then((res) => {
				console.log(res.data.users);
				setUserList(res.data.users);
				console.log(res.data.users);
			})
			.catch((err) => {
				alert.error('Something went wrong');
				console.log(err);
			});
		if (isDeleted) {
			alert.success('User deleted successfully');
			history.push('/admin/users');
			dispatch({ type: DELETE_USER_RESET });
		}
	}, [usersList, dispatch, history, alert, isDeleted]);
	const deleteUserHandler = (id) => {
		dispatch(deleteUser(id));
	};

	const setUsers = () => {
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
					label: 'email',
					field: 'email',
					sort: 'asc',
				},
				{
					label: 'Role',
					field: 'role',
					sort: 'asc',
				},

				{
					label: 'Actions',
					field: 'actions',
				},
			],
			rows: [],
		};

		UsersList &&
			usersList.forEach((user) => {
				data.rows.push({
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					role: user.role,
					actions: (
						<Fragment>
							<Link
								to={`/admin/user/${user._id}`}
								className="btn btn-primary py-1 px-2 ml-2"
							>
								<i className="fa fa-edit"></i>
							</Link>
							<button
								className="btn btn-danger py-1 px-2 ml-2"
								onClick={() => deleteUserHandler(user._id)}
							>
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
			<MetaData title={'All Users'} />
			{!usersList.length ? (
				<Spinner />
			) : (
				<div className="row">
					<div className="col-12 col-md-12">
						<Fragment>
							<h1 className="my-5">All Users</h1>

							<MDBDataTable
								data={setUsers()}
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

export default UsersList;
