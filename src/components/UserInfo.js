export default class UserInfo {
    constructor({nameSelector, introSelector}) {
        this._name = document.querySelector(nameSelector);
        this._intro = document.querySelector(introSelector);
    };
    // текущие данные пользователя
    getUserInfo() {
        this._userInfo = {
            name: this._name.textContent,
            intro: this._intro.textContent
        };
        return this._userInfo;
    };
    // новые данные пользователя
    setUserInfo(dataInput) {
        this._name.textContent = dataInput.name;
        this._intro.textContent = dataInput.intro;
    };
}