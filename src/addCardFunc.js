import {cardList, form, popup} from "./variables";
import {Card} from "./card";
import {enableButton} from "./errorsFunc";

export function addCard(event) {
    event.preventDefault();
    const name = form.elements.name.value;
    const link = form.elements.link.value;
    cardList.addCard(new Card(name, link).cardElement);
    form.reset();
    popup.classList.remove('popup_is-opened');
    const button = form.querySelector(".popup__button");
    enableButton(button, false);
}