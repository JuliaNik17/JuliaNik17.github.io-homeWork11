export class Api {
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

import {Card} from "./card";