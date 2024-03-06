function openModal(popup) {
  popup.classList.add('popup_is-opened', 'popup_is-animated');
};

function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
};

export function handle(popup) {
  openModal(popup);

  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close') || (evt.currentTarget === evt.target)) {
      closeModal(evt.currentTarget);
    }
  });

  popup.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeModal(evt.currentTarget);
    }
  });
};