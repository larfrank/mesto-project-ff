export function openModal(popup) {
  popup.classList.add('popup_is-animated', 'popup_is-opened');
};

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
};

const mouseCallback = (evt) => {
  if (evt.target.classList.contains('popup__close') || (evt.currentTarget === evt.target)) {
    closeModal(evt.currentTarget);
  }
  evt.target.removeEventListener('mousedown', mouseCallback);
};

const keyCallback = (evt) => {
  if (evt.key === 'Escape') {
    document.querySelectorAll('.popup').forEach((elem) => closeModal(elem));
  }
  evt.target.removeEventListener('keydown', keyCallback);
};

export function handlePopup(popup) {
  popup.addEventListener('mousedown', mouseCallback);
  document.addEventListener('keydown', keyCallback);
};