import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup(props) {
    const [cardName, setCardName] = React.useState("");
    const [cardLink, setCardLink] = React.useState("");

    function handleCardName(e) {
        setCardName(e.target.value);
    };

    function handleCardLink(e) {
        setCardLink(e.target.value);
    };

    React.useEffect(() => {
        setCardName("");
        setCardLink("");
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: cardName,
            link: cardLink
        });
    };

    return (
        <PopupWithForm
            name="form-card"
            title="Новое место"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
        >
            <input
                className="popup__input popup__input_type_card-name"
                id="title-input"
                type="text"
                name="name"
                placeholder="Название"
                required
                minLength="1"
                maxLength="30"
                onChange={handleCardName}
            />
            <span className="popup__input-error" id="title-input-error"></span>
            <input
                className="popup__input popup__input_type_card-link"
                id="link-input"
                type="url"
                name="link"
                placeholder="Ссылка на картинку"
                required
                onChange={handleCardLink}
            />
            <span className="popup__input-error" id="link-input-error"></span>
            <input
                className="popup__submit-button"
                type="submit"
                value="Создать"
            />
        </PopupWithForm>
    );
}
