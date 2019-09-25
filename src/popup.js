const popupImage = document.querySelector('.popupImage');

export class Popup {
    constructor(openButton, closeButton) {
        this.openButton = openButton;
        this.closeButton = closeButton;
        this.openButton.addEventListener('click', this.open);
        this.closeButton.addEventListener('click', this.close);
    }

    open(event) {
        const targetClassName = event.target.className;
        if (targetClassName === 'place-card__image') {
            const popupImageContent = document.querySelector('.popupImage');
            popupImageContent.classList.toggle('popupImage_is-opened');
            const popupImage = document.querySelector('.popupImage__picture');
            popupImage.src = event.target.style.backgroundImage.slice(4, -1).replace(/"/g, "");
        } else if (targetClassName === 'button user-info__button') {
            popup.classList.toggle('popup_is-opened');
        } else if (targetClassName === 'button edit__button') {
            popupProfile.classList.toggle('popupPr_is-opened');
            const userName = document.querySelector('.user-info__name');
            const userOccupation = document.querySelector('.user-info__job');
            formProf.elements.name.value = userName.textContent;
            formProf.elements.occupation.value = userOccupation.textContent;
        }
    }

    close(event) {
        const targetClassName = event.target.className;
        if (targetClassName === 'popupImage__close') {
            popupImage.classList.remove('popupImage_is-opened');
        } else if (targetClassName === 'popup__close') {
            popup.classList.remove('popup_is-opened');
        } else if (targetClassName === 'popupPr__close') {
            popupProfile.classList.remove('popupPr_is-opened');
        }
    }

}

import {popup, popupProfile, formProf} from "./variables";