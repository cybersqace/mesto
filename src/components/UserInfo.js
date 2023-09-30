export default class UserInfo {
  constructor({ username, about, avatar }) {
    this._username = document.querySelector(username);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  }

  // возвращает объект с данными пользователя
  getUserInfo() {
    const userInfo = {
      username: this._username.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src
    }

    return userInfo;
  }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(data) {
    this._username.textContent = data.name;
    this._about.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}