let editProfileButton = document.querySelector('.profile__edit');
let popupElement = document.querySelector('.popup');
let popupInputNameElement = document.querySelector('.popup__input_type_name');
let popupInputInfoElement = document.querySelector('.popup__input_type_description');
let popupCloseButton = popupElement.querySelector('.popup__close');
let popupSaveButtonElement = popupElement.querySelector('.popup__save');

function initForm() {
    popupInputNameElement.value = document.querySelector('.profile__name').textContent;
    popupInputInfoElement.value = document.querySelector('.profile__description').textContent;
}

editProfileButton.addEventListener('click', function() {
    popupElement.classList.add('popup_opened');
    initForm();
});

popupCloseButton.addEventListener('click', function() {
    popupElement.classList.remove('popup_opened');
});

let editInformation = function() {
    document.querySelector('.profile__name').textContent = popupInputNameElement.value;
    document.querySelector('.profile__description').textContent = popupInputInfoElement.value;
    popupElement.classList.remove('popup_opened');
}

popupSaveButtonElement.addEventListener('click', editInformation);
popupElement.addEventListener('keyup', function(event) {
    if(event.code !== 'Enter') {return}
    editInformation();
})

