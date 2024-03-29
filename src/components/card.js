import { deleteCard, addLike, deleteLike } from "./api";

export const deleteCallback = (evt) => {
  deleteCard(evt.target.closest('.places__item').cardId)
    .then((res) => {
      console.log(res);
      evt.target.closest('.places__item').remove();
    })
    .catch((err) => {
      console.log(err); 
    })

};

export const likeCallback = (evt) => {
  const cardElem = evt.target.closest('.places__item');
  const likeCount = cardElem.querySelector('.card__like-count');

  if (!evt.target.isLiked) {
    addLike(cardElem.cardId)
      .then((cardData) => {
        evt.target.classList.add('card__like-button_is-active');
        likeCount.textContent = cardData.likes.length;
        evt.target.isLiked = true;
      })
      .catch((err) => {
        console.log(err); 
      })
  }
  else {
    deleteLike(cardElem.cardId)
      .then((cardData) => {
        evt.target.classList.remove('card__like-button_is-active');
        likeCount.textContent = cardData.likes.length;
        evt.target.isLiked = false;
      })
      .catch((err) => {
        console.log(err); 
      })
  }
}


export function createCard(cardData, deleteFunction, likeFunction, openImgFunction, userId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardDeleteBtn = cardElement.querySelector('.card__delete-button');
  const cardLikeBtn = cardElement.querySelector('.card__like-button');

  if (!(cardData.owner._id == userId)) {
    cardDeleteBtn.classList.add('card__delete-button__inactive');
  } 

  if (cardData.likes.find(like => { return like._id == userId })) {
    cardLikeBtn.classList.add('card__like-button_is-active');
    cardLikeBtn.isLiked = true;
  }

  cardElement.cardId = cardData._id;
  cardElement.likes = cardData.likes.length;
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').alt = cardData.name;
  cardElement.querySelector('.card__like-count').textContent = cardData.likes.length;

  cardDeleteBtn.addEventListener('click', deleteFunction);
  cardLikeBtn.addEventListener('click', likeFunction);
  cardElement.querySelector('.card__image').addEventListener('click', openImgFunction);

  return cardElement;
};
