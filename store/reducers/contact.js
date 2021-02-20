import { HYDRATE } from "next-redux-wrapper";
import * as t from "../types";

const initialState = {
	contactList: [],
	selectedContact: undefined,
	isModalOpen: false,
};

const mainReducer = (state = initialState, action) => {
	switch (action.type) {
		case HYDRATE:
			return { ...state, ...action.payload };
		case t.MODAL_OPEN:
			return {
				...state,
				isModalOpen: action.payload,
			};
		case t.CONTACT_FETCH_SUCCEEDED:
			return {
				...state,
				contactList: action.payload,
			};
		case t.CONTACT_ADD_SUCCEEDED:
			return {
				...state,
				contactList: [action.payload, ...state.contactList],
			};
		case t.CONTACT_UPDATE_SUCCEEDED:
			const updatedContact = state.contactList.map((contact) => {
				if (contact.id === action.payload.id) {
					return {
						...contact,
						name: action.payload.name,
						email: action.payload.email,
						address: action.payload.address,
						city: action.payload.city,
						country: action.payload.country,
						phone: action.payload.phone,
					};
				}
				return contact;
			});

			return { ...state, contactList: updatedContact };
		case t.CONTACT_DELETE_SUCCEEDED:
			const newContactList = state.contactList.filter(
				(contact) => contact.id !== action.payload
			);
			return {
				...state,
				contactList: newContactList,
			};
		case t.CONTACT_SELECTED:
			const selectedContact = state.contactList.find(
				(contact) => contact.id === action.payload
			);
			return {
				...state,
				selectedContact,
			};
		default:
			return state;
	}
};

export default mainReducer;
