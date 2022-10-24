import { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main(props) {
	const currentUser = useContext(CurrentUserContext);

    return(
        <main className="content">
			{/* <!-- Профиль пользователя --> */}
			<section className="profile">
				<div className="profile__avatar-container">
					<img
						className="profile__avatar"
						src={currentUser.avatar}
						alt={currentUser.name}/>
					<div className="profile__avatar-overlay">
						<button className="profile__avatar-button" onClick={props.onEditAvatar}></button>
					</div>
				</div>
				<div className="profile__info">
					<h1 className="profile__name">{currentUser.name}</h1>
					<h2 className="profile__about">{currentUser.about}</h2>
				</div>
				<button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
				<button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
			</section>
			{/* <!-- Карточки --> */}
			<section className="elements">
				{props.cards?.map((newCard) => (
						<Card
							card={newCard}
							key={newCard._id}
							name={newCard.name}
							link={newCard.link}
							onCardClick={props.onCardClick}
							likes={newCard.likes.length}
							onCardLike={props.onCardLike}
							onCardDelete={props.onCardDelete} />
					)
				)}
			</section>
		</main>
    );
}