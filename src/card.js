export class Card {
    constructor(name, link) {
        this.cardElement = this.create(name, link);
        this.like = this.like.bind(this);
        this.remove = this.remove.bind(this);
    }

    create(name, link) {
        const placeCard = document.createElement('div');
        placeCard.classList.add('place-card');

        const placeLink = document.createElement('div');
        placeLink.classList.add('place-card__image');
        placeLink.style.backgroundImage = `url(${link})`;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('place-card__delete-icon');

        const placeCardDescription = document.createElement('div');
        placeCardDescription.classList.add('place-card__description');

        const placeName = document.createElement('h3');
        placeName.classList.add('place-card__name');
        placeName.textContent = name;

        const likeButton = document.createElement('button');
        likeButton.classList.add('place-card__like-icon');

        const likeCounter = document.createElement('h4');
        likeCounter.classList.add('place-card__like-counter');
        likeCounter.textContent = '1';

        const popupImageClose = document.querySelector('.popupImage__close');


        placeCard.appendChild(placeLink);
        placeLink.appendChild(deleteButton);

        placeCard.appendChild(placeCardDescription);
        placeCardDescription.appendChild(placeName);
        placeCardDescription.appendChild(likeButton);
        placeCardDescription.appendChild(likeCounter);


        likeButton.addEventListener('click', this.like);

        new Popup(placeLink, popupImageClose);

        deleteButton.addEventListener('click', this.remove.bind(placeCard));

        return placeCard;
    }

    like(event) {
        event.target.classList.toggle('place-card__like-icon_liked');
    }

    remove(event) {
        const currentCard = event.target.closest('.place-card');
        const deleteButton = this.querySelector('.place-card__delete-icon');
        deleteButton.removeEventListener('click', this.remove);
        list.removeChild(currentCard);
    }
}

import {Popup} from "./popup";
import {list} from "./variables";