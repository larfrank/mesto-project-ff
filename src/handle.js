import { openModal, mouseClose, keyboardClose} from './modal.js'

export function handle(popup) {
    openModal(popup);
    popup.addEventListener('click', mouseClose);
    popup.addEventListener('keydown', keyboardClose);
  };