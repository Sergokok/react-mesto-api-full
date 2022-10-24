import React from "react";

export default function ImagePopup({ card, onClose, isOpen }) {
	const className = `popup popup_fullscreen ${card && "popup_active"}`;

	React.useEffect(() => {
		const handleEscClose = (e) => {
			if (e.key === "Escape") {
			  onClose();
			}
		};
			if (isOpen) {
				document.addEventListener("keydown", handleEscClose);
			} else {
				document.removeEventListener("keydown", handleEscClose);
			}
	}, [isOpen, onClose]);


	return (
		<div
			className={className}
			onClick={onClose}>
			<div
				className="popup__image-container"
				onClick={(event) => {
				event.stopPropagation();
				}}>
				<figure className="popup__figure">
					<button
						className="popup__close-button"
						type="button"
						onClick={onClose}
					>
					</button>
					<img
						className="popup__image"
						src={card?.link}
						alt={card?.name}
					/>
					<figcaption className="popup__caption">{card ? card.name : ``}</figcaption>
				</figure>
			</div>
		</div>
	);
}