import { useDispatch } from "react-redux";
import { setModalOpen } from "../store";

export function Header() {
	const dispatch = useDispatch();

	return (
		<header className="header">
			<h1 className="header__h1">
				<span>Contacts</span>
			</h1>
			<button
				className="btn btn__primary btn__icon"
				onClick={() => {
					dispatch(setModalOpen(true));
				}}
			>
				<span>Add Contact</span>
			</button>
		</header>
	);
}
