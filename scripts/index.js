const cardContainer = document.querySelector('.places__list');

function createCard(cardData, deleteFunction) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteFunction);

  return cardElement;
}

initialCards.forEach((elem) => {
  const card = createCard(elem, (event) => {
    event.target.closest('.places__item').remove();
  });
  cardContainer.append(card);
})