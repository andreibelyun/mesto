export default class UserInfo {
    constructor({nameSelector, infoSelector, avatarSelector}) {
        this._profileNameElement = document.querySelector(nameSelector);
        this._profileInfoElement = document.querySelector(infoSelector);
        this._profileAvatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        this._name = this._profileNameElement.textContent;
        this._info = this._profileInfoElement.textContent;

        return {name: this._name, info: this._info};
    }

    setUserInfo({name, link}) {
        this._profileNameElement.textContent = name;
        this._profileInfoElement.textContent = link;
    }

    setUserAvatar(link) {
        this._profileAvatar.src = link;
    }
}