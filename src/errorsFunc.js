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

export {activateError, resetError, enableButton};