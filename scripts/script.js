//Добавляем на страницу два похожих попапа (DRY)
function initPopup(titleName, buttonName, className) {
    const popupTemplate = document.querySelector('#popup-template').content;
    const popupElement = popupTemplate.querySelector('.popup').cloneNode('true');
    popupElement.querySelector('.popup__title').textContent = titleName;
    popupElement.querySelector('.popup__save').textContent = buttonName;
    popupElement.classList.add(className);
    document.querySelector('.page__container').append(popupElement);
}

initPopup('Редактировать профиль', 'Сохранить', 'edit-profile-popup');
initPopup('Новое место', 'Создать', 'create-place-popup');

//Попап для редактирования профиля
const editProfileButton = document.querySelector('.profile__edit');
const profileNameElement = document.querySelector('.profile__name');
const profileInfoElement = document.querySelector('.profile__description');
const editProfilePopupElement = document.querySelector('.edit-profile-popup');
const popupFormElement = editProfilePopupElement.querySelector('.popup__form');
const popupInputNameElement = editProfilePopupElement.querySelector('.popup__input_type_name');
const popupInputInfoElement = editProfilePopupElement.querySelector('.popup__input_type_description');
const popupCloseButton = editProfilePopupElement.querySelector('.popup__close');

function initForm() {
    popupInputNameElement.value = profileNameElement.textContent;
    popupInputInfoElement.value = profileInfoElement.textContent;
    openPopup();
}

function openPopup() {
    editProfilePopupElement.classList.add('popup_opened');
}

function closePopup() {
    editProfilePopupElement.classList.remove('popup_opened');
}

editProfileButton.addEventListener('click', initForm);

popupCloseButton.addEventListener('click', closePopup);

function editInformation(event) {
    event.preventDefault();
    profileNameElement.textContent = popupInputNameElement.value;
    profileInfoElement.textContent = popupInputInfoElement.value;
    closePopup();
}

popupFormElement.addEventListener('submit', editInformation);

//Попап для добавления новой карточки



const createPlacePopupElement = document.querySelector('.create-place-popup');
createPlacePopupElement.querySelector('.popup__input_type_name').placeholder = 'Название';
createPlacePopupElement.querySelector('.popup__input_type_description').placeholder = 'Ссылка на картинку';


const addPlaceButtonElement = document.querySelector('.profile__add-element');
addPlaceButtonElement.addEventListener('click', () => {
    createPlacePopupElement.classList.add('popup_opened');
});

const addPlacePopupCloseButton = createPlacePopupElement.querySelector('.popup__close');
addPlacePopupCloseButton.addEventListener('click', () => {
    createPlacePopupElement.classList.remove('popup_opened');
});




// 1. Загрузка на страницу карточек "из коробки"
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const cardsArray = document.querySelector('.cards');

initialCards.forEach(item => {
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode('true');
    cardElement.querySelector('.card__title').textContent = item.name;
    cardElement.querySelector('.card__photo').src = item.link;
    cardsArray.append(cardElement);
});

// 2. Форма добавления карточки (открытие/закрытие)


// 3. Добавление карточки

// 4. Реализация работы лайков
const likeElement = document.querySelectorAll('.card__like');
likeElement.forEach(item => { 
    item.addEventListener('click', event => {
        event.target.classList.toggle('card__like_active');
    });
});

// 5. Удаление карточки
const removeCardButtonElement = document.querySelectorAll('.card__remove');
removeCardButtonElement.forEach(item => {
    item.addEventListener('click', () => {
        item.closest('.card').remove();
    });
});