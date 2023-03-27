export default class UserInfo {
    constructor({nameSelector, aboutSelector}) {
        this._name = document.querySelector(nameSelector);
        this._about = document.querySelector(aboutSelector);
    };
    // текущие данные пользователя
    getUserInfo() {
        return {
            title: this._name.textContent,
            data: this._about.textContent
        };
    };
    // новые данные пользователя
    setUserInfo() {
        this._name.textContent = dataInput.title;
        this._about.textContent = dataInput.data;
    };
}