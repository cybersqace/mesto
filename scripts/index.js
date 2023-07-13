const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = popup.querySelector('.popup__close');
const popupToggle = function () {
  popup.classList.toggle('popup_opened');
  nameInput.value = username.textContent;
  jobInput.value = job.textContent;
}
let formElement = document.querySelector('.form-personal');
let nameInput = formElement.querySelector('.form-personal__field_type_name');
let jobInput = formElement.querySelector('.form-personal__field_type_job');
 
let username = document.querySelector('.profile__title');
let job = document.querySelector('.profile__description');

//отправка формы

function handleFormSubmit (evt) {
    evt.preventDefault();
    username.textContent = nameInput.value;
    job.textContent = jobInput.value;
    popupToggle()
}

popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);
formElement.addEventListener('submit', handleFormSubmit);
