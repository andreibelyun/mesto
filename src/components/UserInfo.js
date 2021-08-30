export default class UserInfo {
    constructor({nameSelector, infoSelector}) {
        this._profileNameElement = document.querySelector(nameSelector);
        this._profileInfoElement = document.querySelector(infoSelector);
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
}