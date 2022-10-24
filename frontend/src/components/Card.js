import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card(props) {
	const currentUser = React.useContext(CurrentUserContext);
	const isOwn = props.card.owner._id === currentUser._id;

	const cardDeleteButtonClassName = (
		`elements__trash-button ${isOwn ? "elements__trash-button_active" : ""}`
	)

	const isLiked = props.card.likes.some(({_id}) => _id === currentUser._id);

	const cardLikeButtonClassName = (
		`elements__like-button ${isLiked ? "elements__like-button_active" : ""}`);

	function handleClick() {
		props.onCardClick(props.card);
	}
	function handleLike() {
		props.onCardLike(props.card);
	}

	function handleDelete() {
		props.onCardDelete(props.card);
	}

	return (
		<div className="elements__card">
			<img className="elements__image" src={props.link} alt={props.name} onClick={handleClick} />
			<button className={cardDeleteButtonClassName} type="button" onClick={handleDelete}/>
				<h2 className="elements__title">{props.name}</h2>
				<div className="elements__like-container">
					<button className={cardLikeButtonClassName} type="button" id="like" onClick={handleLike} />
					<span className="elements__like-counter">{props.likes}</span>
				</div>
		</div>
	);
}