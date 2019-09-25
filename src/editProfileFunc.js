import {api, formProf, popupProfile} from "./variables";
import {enableButton} from "./errorsFunc";

export function editProfile(event) {
    event.preventDefault();
    api.updateUserProfile(formProf.elements.name.value, formProf.elements.occupation.value);
    formProf.reset();
    popupProfile.classList.remove('popupPr_is-opened');
    const button = formProf.querySelector(".popupPr__button");
    enableButton(button, false);
}