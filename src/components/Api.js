export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  // errors
  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getData() {
    return Promise.all([this.getUserData(), this.getInitialCards()]);
  }

  // пользователь
  getUserData() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    })
      .then((res) => this._checkResponse(res))
  }

  // профиль пользователя
  editProfile(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      })
    })
    .then((res) => this._checkResponse(res))
  }

  // аватарка пользователя
  editAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      })
    })
      .then((res) => this._checkResponse(res))
  }

  // карточки
  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    })
      .then((res) => this._checkResponse(res))
  }

  // добавление карточки
  addCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      })
    })
      .then((res) => this._checkResponse(res))
  }

  // лайк карточки
  setLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    })
      .then((res) => this._checkResponse(res))
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res) => this._checkResponse(res))
  }

  // удаление карточки
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then((res) => this._checkResponse(res))
  }

}