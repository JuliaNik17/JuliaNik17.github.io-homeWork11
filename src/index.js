class Card {
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

class CardList {
    constructor(cardsContainer, cardsList) {
        this.cardsContainer = cardsContainer;
        this.cardsList = cardsList;
    }

    addCard(card) {
        this.cardsContainer.appendChild(card);
    }

    render() {
        for(let i = 0; i < this.cardsList.length; i++) {
            const card = this.cardsList[i];
            const cardElement = card.cardElement;
            this.cardsContainer.appendChild(cardElement);
        }
    }
}

class Popup {
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

class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
        this.initialUserInfo();
    }

    responseToResult(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    }

    initialUserInfo() {
        fetch( this.baseUrl +'/users/me', {
            headers: this.headers
        })
            .then(this.responseToResult)
            .then((result) => {
                const userName = document.querySelector('.user-info__name');
                userName.textContent = result.name;
                const userJob = document.querySelector('.user-info__job');
                userJob.textContent = result.about;
            })
            .catch((err) => {
                console.log(err);
            });
    }

    getInitialCards(cardList) {

        fetch( this.baseUrl + '/cards', {
            headers: this.headers
        })
            .then(this.responseToResult)
            .then((result) => {
                result.forEach(initialCard => {
                    const card = new Card(initialCard.name, initialCard.link).cardElement;
                    cardList.addCard(card);
                });
                cardList.render();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    updateUserProfile(nameValue, aboutValue) {
        const userName = document.querySelector('.user-info__name');
        const userOccupation = document.querySelector('.user-info__job');
        // const button = formProf.querySelector(".popupPr__button");
        // button.textContent = 'Загрузка...';

        fetch(this.baseUrl + '/users/me', {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: nameValue,
                about: aboutValue
            })
        })
            .then(this.responseToResult)
            .then(result => {
                userName.textContent = result.name;
                userOccupation.textContent = result.about;
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

const api = new Api({
    baseUrl: 'http://95.216.175.5/cohort1',
    headers: {
        authorization: '31efe493-4c57-4082-bdc8-65bcab4b212b',
        'Content-Type': 'application/json'
    }
});


const list = document.querySelector('.places-list');
const cardList = new CardList(list, []);
api.getInitialCards(cardList);


const popupImage = document.querySelector('.popupImage');
const userInfo = document.querySelector('.user-info');
const userInfoButton = userInfo.querySelector('.user-info__button');
const popup = document.querySelector('.popup');
const addButton = document.querySelector('.edit__button');
const popupProfile = document.querySelector('.popupPr');
const closeButton = document.querySelector('.popup__close');
const closeProfileButton = document.querySelector('.popupPr__close');
const formProf = document.forms.editProfile;
const form = document.forms.new;

new Popup(userInfoButton, closeButton);
new Popup(addButton, closeProfileButton);

formProf.addEventListener('submit', editProfile);
formProf.addEventListener('input', checkInput);

form.addEventListener('submit',addCard);
form.addEventListener('input', checkInput);


function addCard(event) {
    event.preventDefault();
    const name = form.elements.name.value;
    const link = form.elements.link.value;
    cardList.addCard(new Card(name, link).cardElement);
    form.reset();
    popup.classList.remove('popup_is-opened');
    const button = form.querySelector(".popup__button");
    enableButton(button, false);
}


function editProfile(event) {
    event.preventDefault();
    api.updateUserProfile(formProf.elements.name.value, formProf.elements.occupation.value);
    formProf.reset();
    popupProfile.classList.remove('popupPr_is-opened');
    const button = formProf.querySelector(".popupPr__button");
    enableButton(button, false);
}


function checkInput(event) {
    const saveButton = event.currentTarget.querySelector(".button");
    if (validateCurrentInput(event.target) && validateAllInputs(event.currentTarget)) {
        enableButton(saveButton, true);
    } else {
        enableButton(saveButton, false);
    }
}


function validateCurrentInput(element) {
    const errorElement = document.querySelector(`#error-${element.id}`);
    if(element.value === "") {
        errorElement.textContent = 'Это обязательное поле';
        activateError(errorElement);
        return false;
    } else if (!element.checkValidity()) {
        errorElement.textContent = 'Должно быть от 2 до 30 символов';
        activateError(errorElement);
        return false;
    } else if(element.id==="URL") {
        if (!validateURL(element)){
            errorElement.textContent = 'Здесь должна быть ссылка';
            activateError(errorElement);
            return false;
        }
    }
    resetError(errorElement);
    return true;
}

function validateAllInputs(form) {
    const inputs = Array.from(form.getElementsByTagName("input"));
    const errors = form.querySelectorAll(".error-message");

    let isValidForm = true;

    inputs.forEach((input) => {
        if (input.value === "") isValidForm = false;
    });

    errors.forEach((error) => {
        if (error.textContent !== "") isValidForm = false;
    });

    return isValidForm;
}


function activateError(element) {
    element.parentNode.classList.add('input-container__invalid');
}

function resetError(element) {
    element.parentNode.classList.remove('input-container__invalid');
    element.textContent = '';
}

function enableButton(button, enabled) {
    if (enabled) {
        button.disabled = false;
        button.style.backgroundColor = 'black';
        button.style.color = 'white';
    } else {
        button.disabled = true;
        button.style.backgroundColor = 'white';
        button.style.color = 'grey';
    }
}

// import {validateURL} from "./validUrl";
function validateURL(element) {
    const url = element.value;
    let pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return pattern.test(url);
}

import "./index.css"
