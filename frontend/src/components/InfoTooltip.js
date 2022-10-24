import { useEffect } from 'react';
import success from '../images/Success.svg';
import failure from '../images/Failure.svg';

export default function InfoTooltip({ isOpen, onClose, onInfoTooltipStatus }) {
    const className = `popup popup_info-tooltip ${isOpen && "popup_active"}`;

    useEffect(() => {
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
        <div className={className}>
            <div className="popup__container">
                <img className="popup__icon" src={onInfoTooltipStatus ? success : failure} alt="Информация" />
                <p className="popup__text">{onInfoTooltipStatus ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</p>
                <button className="popup__close-button" type="button" onClick={onClose} />
            </div>
        </div>
    )
}