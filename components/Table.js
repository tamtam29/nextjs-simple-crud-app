import { useSelector, useDispatch } from "react-redux";
import { PencilSVG, TrashSVG } from "../icons";
import {
	deleteContact,
	fetchContacts,
	setModalOpen,
	setSelectedContact,
} from "../store";
import { useEffect } from "react";

export function Table() {
	const state = useSelector((state) => state.contact);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchContacts());
	}, [dispatch]);

	return (
		<table className="table">
			<thead className="table__head">
				<tr>
          <th>ID</th>
					<th>Name</th>
					<th>Email</th>
					<th>Address</th>
          <th>City</th>
          <th>Country</th>
					<th>Phone</th>
					<th>Actions</th>
				</tr>
			</thead>

			<tbody className="table__body">
				{state.contactList.map(({ id, name, email, address, city, country, phone }) => (
					<tr key={id}>
						<td>{id}</td>
            <td>{name}</td>
						<td>{email}</td>
						<td>{address}</td>
            <td>{city}</td>
            <td>{country}</td>
						<td>{phone}</td>
						<td>
							<button
								className="btn btn__compact btn__edit"
								onClick={() => {
									dispatch(setSelectedContact(id));
									dispatch(setModalOpen(true));
								}}
							>
								<PencilSVG />
							</button>
							<button
								className="btn btn__compact btn__delete"
								onClick={() => {
									dispatch(deleteContact(id));
								}}
							>
								<TrashSVG />
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
