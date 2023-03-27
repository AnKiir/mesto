export default class UserInfo {
    constructor({nameSelector, introSelector}) {
        this._name = document.querySelector(nameSelector);
        this._intro = document.querySelector(introSelector);
    };
    // текущие данные пользователя
    getUserInfo() {
        return {
            title: this._name.textContent,
            data: this._intro.textContent
        };
    };
    // новые данные пользователя
    setUserInfo() {
        this._name.textContent = dataInput.title;
        this._intro.textContent = dataInput.data;
    };
}