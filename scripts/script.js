//Элементы профиля
const editProfileButton = document.querySelector('.profile__edit');
const profileNameElement = document.querySelector('.profile__name');
const profileInfoElement = document.querySelector('.profile__description');
//Попап для редактирования профиля
const editProfilePopupElement = document.querySelector('.edit-profile-popup');
const editProfilePopupFormElement = editProfilePopupElement.querySelector('.popup__form');
const editProfilePopupInputNameElement = editProfilePopupElement.querySelector('.popup__input_type_name');
const editProfilePopupInputInfoElement = editProfilePopupElement.querySelector('.popup__input_type_description');
const editProfilePopupCloseButton = editProfilePopupElement.querySelector('.popup__close');

function initForm() {
    editProfilePopupInputNameElement.value = profileNameElement.textContent;
    editProfilePopupInputInfoElement.value = profileInfoElement.textContent;
    openPopup(editProfilePopupElement);
}

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function editInformation(event) {
    event.preventDefault();
    profileNameElement.textContent = editProfilePopupInputNameElement.value;
    profileInfoElement.textContent = editProfilePopupInputInfoElement.value;
    closePopup(editProfilePopupElement);
}
//Открытие с заполнением текущими значениями/ закрытие/ сохраниние
editProfileButton.addEventListener('click', initForm);
editProfilePopupCloseButton.addEventListener('click', () => {closePopup(editProfilePopupElement)});
editProfilePopupFormElement.addEventListener('submit', editInformation);

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
//Кнопка добавления карточки
const addPlaceButtonElement = document.querySelector('.profile__add-element');
//Попап для добавления новой карточки
const createPlacePopupElement = document.querySelector('.create-place-popup');
const createPlacePopupCloseButton = createPlacePopupElement.querySelector('.popup__close');
createPlacePopupElement.querySelector('.popup__input_type_name').placeholder = 'Название';
createPlacePopupElement.querySelector('.popup__input_type_description').placeholder = 'Ссылка на картинку';
//Открытие/ закрытие
addPlaceButtonElement.addEventListener('click', () => {
  openPopup(createPlacePopupElement);
  clearCreatePlacePopupInputs();
});
createPlacePopupCloseButton.addEventListener('click', () => {closePopup(createPlacePopupElement)});

function clearCreatePlacePopupInputs () {
  createPlacePopupInputInfoElement.value = '';
  createPlacePopupInputNameElement.value = '';
}
// 3. Добавление карточки
const createPlacePopupFormElement = createPlacePopupElement.querySelector('.popup__form');
const createPlacePopupInputNameElement = createPlacePopupElement.querySelector('.popup__input_type_name');
const createPlacePopupInputInfoElement = createPlacePopupElement.querySelector('.popup__input_type_description');
createPlacePopupFormElement.addEventListener('submit', addCard); 

function addCard(event) {
  event.preventDefault();
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode('true');
  cardElement.querySelector('.card__title').textContent = createPlacePopupInputNameElement.value;
  cardElement.querySelector('.card__photo').src =  createPlacePopupInputInfoElement.value;
  cardsArray.prepend(cardElement);
  addLikeEvent(cardElement.querySelector('.card__like'));
  addRemoveEvent(cardElement.querySelector('.card__remove'));
  addOpenPhotoPopupEvent(cardElement.querySelector('.card__photo'));

  closePopup(createPlacePopupElement);
}

// 4. Реализация работы лайков
const likeElement = document.querySelectorAll('.card__like');
likeElement.forEach(item => { 
  addLikeEvent(item);
});

function addLikeEvent(element) {
  element.addEventListener('click', event => {
    event.target.classList.toggle('card__like_active');
  });
}

// 5. Удаление карточки
const removeCardButtonElement = document.querySelectorAll('.card__remove');
removeCardButtonElement.forEach(item => {
    addRemoveEvent(item);
});

function addRemoveEvent(element) {
  element.addEventListener('click', () => {
    element.closest('.card').remove();
  });
}

// 6. Попап с картинкой
const photos = document.querySelectorAll('.card__photo');
photos.forEach(item => {addOpenPhotoPopupEvent(item)});

const photoPopupElement = document.querySelector('.photo-popup');
const closePhotoPopupButton = photoPopupElement.querySelector('.photo-popup__close');

closePhotoPopupButton.addEventListener('click', () => {
  photoPopupElement.classList.remove('photo-popup_opened');
});

function addOpenPhotoPopupEvent(element) {
  element.addEventListener('click', () => {
    photoPopupElement.querySelector('.photo-popup__picture').src = element.src;
    photoPopupElement.querySelector('.photo-popup__caption').textContent = element.closest('.card').querySelector('.card__title').textContent;
    photoPopupElement.classList.add('photo-popup_opened');
  });
}