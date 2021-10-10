export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, { headers: this._headers })
        .then(res => {
            if(res.ok) {
                return res.json();
            } else {
                throw new Error(`Response is not ok with status ${res.status}`);
            }
        })
        .catch(err => {
            console.error(err);

            return [];
        });
    }

    getUserInformation() {
        return fetch(`${this._baseUrl}/users/me`, { headers: this._headers })
        .then(res => {
            if(res.ok) {
                return res.json();
            } else {
                throw new Error(`Response is not ok with status ${res.status}`);
            }
        })
        .catch(err => {
            console.error(err);

            return {};
        });
    }

    setUserInformation(name, about) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "PATCH", 
            headers: this._headers, 
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            } else {
                throw new Error(`Response is not ok with status ${res.status}`);
            }
        })
        .catch(err => {
            console.error(err);

            return {
                name: "",
                about: ""
            };
        });
    }

    addNewCard(name, link) {
        return fetch(`${this._baseUrl}/cards`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            } else {
                throw new Error(`Response is not ok with status ${res.status}`);
            }
        })
        .catch(err => {
            console.error(err);

            return {
                name: "",
                link: ""
            }
        });
    }

    deleteCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-27/cards/${cardId}`, {
        method: "DELETE",
        headers: this._headers
      })
      .catch(err => {
          console.error(err);
      });
    }

    putLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "PUT",
            headers: this._headers})
        .then(res => {
            if(res.ok) {
                return res.json();
            } else {
                throw new Error(`Response is not ok with status ${res.status}`);
            }
        })
        .catch(err => {
            console.error(err);

            return {};
        });
    }

    removeLike(cardId) {
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: "DELETE",
            headers: this._headers
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            } else {
                throw new Error(`Response is not ok with status ${res.status}`);
            }
        })
        .catch(err => {
            console.error(err);

            return {};
        });
    }

    changeAvatar(data) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({avatar: data.link})
        })
        .then(res => {
            if(res.ok) {
                return res.json();
            } else {
                throw new Error(`Response is not ok with status ${res.status}`);
            }
        })
        .catch(err => {
            console.error(err);

            return {
                avatar: "https://coolwallpapers.me/picsup/375232-batman-wallpaper-free-hd-widescreen.jpg"
            }
        });
    }
}