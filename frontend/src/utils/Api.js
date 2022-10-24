class Api {
	constructor({ baseUrl, headers }) {
		this._baseUrl = baseUrl;
		this._headers = headers;
	}

	// Проверка ответа сервера
	_getResponseData(res) {
		if (!res.ok) {
			return Promise.reject(`Ошибка: ${res.status}`);
		}
		return res.json();
	}

	// Получаение данных пользователя
	getUserInfo() {
		return fetch(`${this._baseUrl}/users/me`, {
			headers: this._headers,
		}).then((res) => this._getResponseData(res));
	}

	// Отправка данных пользователя
	setUserInfo({ name, about }) {
		return fetch(`${this._baseUrl}/users/me`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify({
				name: name,
				about: about,
			}),
		}).then((res) => this._getResponseData(res));
	}

	// Получение карточки
	getInitialCards() {
		return fetch(`${this._baseUrl}/cards`, {
			headers: this._headers,
		}).then((res) => this._getResponseData(res));
	}

	// Добавление карточки
	addCard(item) {
		return fetch(`${this._baseUrl}/cards`, {
			method: 'POST',
			headers: this._headers,
			body: JSON.stringify(item),
		}).then((res) => this._getResponseData(res));
	}

	// Удаление карточки
	deleteCard(cardId) {
		return fetch(`${this._baseUrl}/cards/${cardId}`, {
			method: 'DELETE',
			headers: this._headers,
		}).then((res) => this._getResponseData(res));
	}
	
	// Постановка/снятие лайка
	changeLikeCardStatus(cardId, isLiked) {
		if (isLiked) {
			return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
				method: "DELETE",
				headers: this._headers,
			}).then(this._getResponseData);
		} else {
			return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
				method: "PUT",
				headers: this._headers,
			}).then(this._getResponseData);
		}
	}

	// Изменение аватара
	setUserAvatar(avatar) {
		return fetch(`${this._baseUrl}/users/me/avatar`, {
			method: 'PATCH',
			headers: this._headers,
			body: JSON.stringify(avatar),
		}).then((res) => this._getResponseData(res));
	}
}

// Авторизация
const api = new Api({
	baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-45',
	headers: {
		authorization: '62ebdfd5-7936-4ed6-b3c0-2901452931d5',
		'Content-Type': 'application/json',
	},
});

export default api;
