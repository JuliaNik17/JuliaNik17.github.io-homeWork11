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

function validateURL(element) {
    const url = element.value;
    let pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return pattern.test(url);
}

export {checkInput, validateCurrentInput, validateAllInputs, validateURL};

import {activateError, resetError, enableButton} from "./errorsFunc";