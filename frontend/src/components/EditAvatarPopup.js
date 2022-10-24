import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup(props) {
    const inputRef = React.useRef();

    React.useEffect(() => {
        if (props.isOpen) {
            inputRef.current.value = "";
        }
    }, [props.isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: inputRef.current.value
        });
    }

return (
    <PopupWithForm
        name="form-avatar"
        title="Редактировать аватар"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
        >
        <input
            ref={inputRef}
            className="popup__input popup__input_type_avatar"
            id="avatar"
            type="url"
            name="avatar"
            placeholder="Ссылка на картинку"
            required
        />
        <span className="popup__input-error avatar-input-error"></span>
        <input
            className="popup__submit-button"
            type="submit"
            value="Сохранить"
        />
    </PopupWithForm>
    );
}
