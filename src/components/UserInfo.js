export default class UserInfo {
    constructor({ nameSelector, infoSelector, avatarSelector }) {
        this._name = document.querySelector(nameSelector);
        this._about = document.querySelector(infoSelector);
        this._avatar = document.querySelector(avatarSelector);
    };
    // текущие данные пользователя
    getUserInfo() {
        this._userInfo = {
            name: this._name.textContent,
            about: this._about.textContent
        }
        return this._userInfo;
    };
    // новые данные пользователя
    setUserInfo(inputs) {
        this._name.textContent = inputs.name;
        this._about.textContent = inputs.about;
    };
    // замена аватарки
    setAvatar(avatar) {
        this._avatar.src = avatar,
        this._avatar.alt = this._name.textContent
    };
}