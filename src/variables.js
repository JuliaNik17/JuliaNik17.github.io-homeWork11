import {Api} from "./api";
import {CardList} from "./cardList";

const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort1' : 'https://praktikum.tk/cohort1'

const api = new Api({
    baseUrl: serverUrl,
    headers: {
        authorization: '31efe493-4c57-4082-bdc8-65bcab4b212b',
        'Content-Type': 'application/json'
    }
});
const list = document.querySelector('.places-list');
const cardList = new CardList(list, []);
api.getInitialCards(cardList);

const userInfo = document.querySelector('.user-info');
const userInfoButton = userInfo.querySelector('.user-info__button');
const popup = document.querySelector('.popup');
const addButton = document.querySelector('.edit__button');
const popupProfile = document.querySelector('.popupPr');
const closeButton = document.querySelector('.popup__close');
const closeProfileButton = document.querySelector('.popupPr__close');
const formProf = document.forms.editProfile;
const form = document.forms.new;

export {list, cardList, userInfo, userInfoButton, popup, addButton, popupProfile, closeButton, closeProfileButton, formProf, form, api}