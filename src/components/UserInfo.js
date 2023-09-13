export default class UserInfo {
  constructor({ username, job }) {
    this._username = document.querySelector(username);
    this._job = document.querySelector(job);
  }

  // возвращает объект с данными пользователя
  getUserInfo() {
    return {
      username: this._username.textContent,
      job: this._job.textContent
    }
  }

  // принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ username, job }) {
    this._username.textContent = username;
    this._job.textContent = job;
  }
}