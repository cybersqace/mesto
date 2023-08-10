//функция добавления класса с ошибкой
const showInputError = (formElement, inputElement, errorMessage, errorClass, inputErrorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};
//функция удаления класса с ошибкой
const hideInputError = (formElement, inputElement, errorClass, inputErrorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};
//функция проверки поля ввода на корректность введенных данных
const checkInputValidity = (formElement, inputElement, errorClass, inputErrorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, errorClass, inputErrorClass);
  } else {
    hideInputError(formElement, inputElement, errorClass, inputErrorClass);
  }
};
//функция принимающая параметром элемент формы и добавляющая ее полям нужные обработчки
const setEventListeners = (formElement, validationClassList) => {
  const inputList = Array.from(formElement.querySelectorAll(`.${validationClassList.inputClass}`));
  const submitButton = formElement.querySelector(`.${validationClassList.submitButtonClass}`);
  toggleButtonState(inputList, submitButton, validationClassList.inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationClassList.errorClass, validationClassList.inputErrorClass);
      toggleButtonState(inputList, submitButton, validationClassList.inactiveButtonClass);
    });
  });
};
//функция перебора всех форм на странице
function enableValidation(validationClassList) {
  const formList = Array.from(document.forms);
  formList.forEach(function (formElement) {
    setEventListeners(formElement, validationClassList);
  });
}
//функция для проверки наличия невалидного поля
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
}); 
};
//функция включения и отключения кнопки
function toggleButtonState(inputList, submitButton, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    submitButton.setAttribute('disabled', 'disablebutton');
    submitButton.classList.add(inactiveButtonClass);
  } else {
    submitButton.removeAttribute('disabled');
    submitButton.classList.remove(inactiveButtonClass);
  }
};

enableValidation(validationClassList);