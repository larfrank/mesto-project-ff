const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

export function openModal(popup) {
  popup.classList.add('popup_is-animated', 'popup_is-opened');
  popup.addEventListener('mousedown', mouseCallback);
  document.addEventListener('keydown', keyCallback);
};

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('mousedown', mouseCallback);
  document.removeEventListener('keydown', keyCallback);
};

function mouseCallback(evt) {
  if (evt.target.classList.contains('popup__close') || (evt.currentTarget === evt.target)) {
    closeModal(evt.currentTarget);
  }
};

function keyCallback (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closeModal(openedPopup);
  }
};

export const openImgCallback = (evt) => {
  const cardDesc = evt.target.closest('.places__item').querySelector('.card__title').textContent;

  popupImage.src = evt.target.src; 
  popupCaption.textContent = cardDesc;
  popupImage.alt = cardDesc;
};