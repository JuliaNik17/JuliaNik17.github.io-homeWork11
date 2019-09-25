export class CardList {
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