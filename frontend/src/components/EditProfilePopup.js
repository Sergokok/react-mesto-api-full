import React, { useContext, useState, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

export default function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    return (
        <PopupWithForm
            name="form-profile"
            title="Редактировать профиль"
            onSubmit={handleSubmit}
            isOpen={isOpen}
            onClose={onClose}
        >
            <input
                type="text"
                className="popup__input popup__input_type_name"
                id="name-input"
                name="name"
                placeholder="Имя"
                required
                minLength="2"
                maxLength="40"
                value={name || ''}
                onChange={handleNameChange}
            />
            <span className="popup__input-error" id="name-input-error"></span>
            <input
                type="text"
                className="popup__input popup__input_type_job"
                id="job-input"
                name="about"
                placeholder="О себе"
                required
                minLength="2"
                maxLength="200"
                value={description || ''}
                onChange={handleDescriptionChange}
            />
            <span className="popup__input-error" id="job-input-error"></span>
            <input
                className="popup__submit-button"
                type="submit"
                value="Сохранить"
            />
        </PopupWithForm>
    );
}