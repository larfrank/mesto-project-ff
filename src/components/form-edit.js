const profileTitle = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');

let closeEditFn;

const formElementEdit = document.forms['edit-profile'];
const inputName = formElementEdit.elements.name;
const inputDesc = formElementEdit.elements.description;

export function profileFormInit() {
  inputName.value = profileTitle.textContent;
  inputDesc.value = profileDesc.textContent;
};

function handleFormSubmit(evt) {
  evt.preventDefault();
    
  profileTitle.textContent = inputName.value;
  profileDesc.textContent = inputDesc.value;
  
  closeEditFn(formElementEdit.closest('.popup_type_edit'));
};

export function formEditSubmitInit(closeCallback) {
  closeEditFn = closeCallback;
  formElementEdit.addEventListener('submit', handleFormSubmit);
};