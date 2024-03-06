const deleteCallback = (evt) => {
  evt.target.closest('.places__item').remove();
};

const likeCallback = (evt) => {
  evt.target.classList.toggle('card__like-button_is-active');
};

const openImgCallback = (evt) => {
  const cardDesc = evt.target.closest('.places__item').querySelector('.card__title').textContent;
  const popupImage = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');

  popupImage.src = evt.target.src; 
  popupCaption.textContent = cardDesc;
  popupImage.alt = cardDesc;
};

export function createCard(
  cardData,
  deleteFunction = deleteCallback,
  likeFunction = likeCallback,
  openImgFunction = openImgCallback) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteFunction);
  cardElement.querySelector('.card__like-button').addEventListener('click', likeFunction);
  cardElement.querySelector('.card__image').addEventListener('click', openImgFunction);

  return cardElement;
};
