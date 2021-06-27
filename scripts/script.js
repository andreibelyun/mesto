let editProfileButton = document.querySelector('.profile__edit');
let popupElement = document.querySelector('.popup');
let popupFormElement = popupElement.querySelector('.popup__form');
let popupInputNameElement = document.querySelector('.popup__input_type_name');
let popupInputInfoElement = document.querySelector('.popup__input_type_description');
let popupCloseButton = popupElement.querySelector('.popup__close');
let profileNameElement = document.querySelector('.profile__name');
let profileInfoElement = document.querySelector('.profile__description');

function initForm() {
    openPopup();
    popupInputNameElement.value = profileNameElement.textContent;
    popupInputInfoElement.value = profileInfoElement.textContent;
}

function openPopup() {
    popupElement.classList.add('popup_opened');
}

function closePopup() {
    popupElement.classList.remove('popup_opened');
}

editProfileButton.addEventListener('click', initForm);

popupCloseButton.addEventListener('click', closePopup);

let editInformation = function(event) {
    event.preventDefault();
    profileNameElement.textContent = popupInputNameElement.value;
    profileInfoElement.textContent = popupInputInfoElement.value;
    closePopup();
}

popupFormElement.addEventListener('subimt', editInformation);