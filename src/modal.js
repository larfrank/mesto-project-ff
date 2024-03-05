export function openModal(popup) {
  popup.classList.add('popup_is-opened', 'popup_is-animated');
}

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
}

export function mouseClose(evt) {
  if (evt.target.classList.contains('popup__close')) {
    closeModal(evt.currentTarget);
  }
  else if (evt.currentTarget === evt.target) {
    closeModal(evt.currentTarget);
  }
}

export function keyboardClose(evt) {
  if (evt.key === 'Escape') {
    closeModal(evt.currentTarget);
  }
}

