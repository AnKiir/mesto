export default class UserInfo {
    constructor({ nameSelector, aboutSelector, avatarSelector }) {
        this._name = document.querySelector(nameSelector);
        this._about = document.querySelector(aboutSelector);
        this._avatar = document.querySelector(avatarSelector);
       // this._userId = '';
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
      //  this._userId = inputs.id;
    };
    // замена аватарки
    setAvatar(avatar) {
        this._avatar.src = avatar;
        this._avatar.alt = this._name.textContent
    };
}