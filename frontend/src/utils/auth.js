const baseUrl = 'https://auth.nomoreparties.co';
const headers = { 'Content-Type': 'application/json' }

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    } else {
    return Promise.reject(`Ошибка: ${res.status}`);
    }
}

export function register(email, password) {
    return fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(checkResponse);
}

export function authorize(email, password) {
    return fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(checkResponse);
}

export function getContent(token) {
    return fetch(`${baseUrl}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(checkResponse);
}