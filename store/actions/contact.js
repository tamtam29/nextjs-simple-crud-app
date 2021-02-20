import * as t from "../types";

export const setModalOpen = (isModalOpen) => {
	return {
		type: t.MODAL_OPEN,
		payload: isModalOpen,
	};
};

export const fetchContacts = () => {
	return {
		type: t.CONTACT_FETCH_REQUESTED,
	};
};

export const addContact = (contact) => {
	return {
		type: t.CONTACT_ADD_REQUESTED,
		payload: contact,
	};
};

export const updateContact = (contact) => {
	return {
		type: t.CONTACT_UPDATE_REQUESTED,
		payload: contact,
	};
};

export const deleteContact = (id) => {
	return {
		type: t.CONTACT_DELETE_REQUESTED,
		payload: id,
	};
};

export const setSelectedContact = (id) => {
	return {
		type: t.CONTACT_SELECTED,
		payload: id,
	};
};
