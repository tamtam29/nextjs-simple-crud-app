import { all, put, takeLatest } from "redux-saga/effects";
import * as t from "../types";

function* fetchContacts() {
	try {
		const response = yield fetch("http://localhost:3001/contacts");
		const contactList = yield response.json();

		yield put({
			type: t.CONTACT_FETCH_SUCCEEDED,
			payload: contactList,
		});
	} catch (error) {
		yield put({
			type: t.CONTACT_FETCH_FAILED,
			payload: error.message,
		});
	}
}

function* watchFetchContacts() {
	yield takeLatest(t.CONTACT_FETCH_REQUESTED, fetchContacts);
}

function* addContact(action) {
	try {
		const response = yield fetch("http://localhost:3001/contacts/create", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action.payload),
		});

		const newContact = yield response.json();

		yield put({
			type: t.CONTACT_ADD_SUCCEEDED,
			payload: newContact,
		});
	} catch (error) {
		yield put({
			type: t.CONTACT_ADD_FAILED,
			payload: error.message,
		});
	}
}

function* watchAddContact() {
	yield takeLatest(t.CONTACT_ADD_REQUESTED, addContact);
}

function* deleteContact(action) {
	try {
		const response = yield fetch("http://localhost:3001/contacts/"+action.payload+"/delete", {
			method: "DELETE",
		});

		const deletedContact = yield response.json();

		yield put({
			type: t.CONTACT_DELETE_SUCCEEDED,
			payload: deletedContact.id,
		});
	} catch (error) {
		yield put({
			type: t.CONTACT_DELETE_FAILED,
			payload: error.message,
		});
	}
}

function* watchRemoveContact() {
	yield takeLatest(t.CONTACT_DELETE_REQUESTED, deleteContact);
}

function* updateContact(action) {
	try {
		const response = yield fetch("http://localhost:3001/contacts/"+action.payload.id+"/update", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(action.payload),
		});

		const updatedContact = yield response.json();

		yield put({
			type: t.CONTACT_UPDATE_SUCCEEDED,
			payload: updatedContact,
		});
	} catch (error) {
		yield put({
			type: t.CONTACT_UPDATE_FAILED,
			payload: error.message,
		});
	}
}

function* watchUpdateContact() {
	yield takeLatest(t.CONTACT_UPDATE_REQUESTED, updateContact);
}

export default function* rootSaga() {
	yield all([
		watchFetchContacts(),
		watchAddContact(),
		watchRemoveContact(),
		watchUpdateContact(),
	]);
}
