new Popup(userInfoButton, closeButton);
new Popup(addButton, closeProfileButton);

formProf.addEventListener('submit', editProfile);
formProf.addEventListener('input', checkInput);

form.addEventListener('submit',addCard);
form.addEventListener('input', checkInput);



import {Popup} from "./popup";

import {userInfoButton, addButton, closeButton, closeProfileButton, formProf, form} from "./variables";

import {addCard} from "./addCardFunc";

import {editProfile} from "./editProfileFunc";

import {checkInput} from "./validation"

import "./index.css"




