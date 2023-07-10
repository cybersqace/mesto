const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__open-popup');
const popupCloseButton = popup.querySelector('.popup__close');
const popupToggle = function () {
  popup.classList.toggle('popup_opened');
}
popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);

//отправка формы

let formElement = document.querySelector('.popup__form');

let nameInput = formElement.querySelector('.popup__form_name');
let jobInput = formElement.querySelector('.popup__form_job');

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    let nameValue = nameInput.value;
    let jobValue = jobInput.value;
 
    let username = document.querySelector('.profile__title');
    let job = document.querySelector('.profile__description');

    username.textContent = nameValue;
    job.textContent = jobValue;
}

formElement.addEventListener('submit', handleFormSubmit);
