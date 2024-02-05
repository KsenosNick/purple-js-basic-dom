'use strict';

function submitForm() {
    const input = document.querySelector('.input').value;
    if (!input) {
        return;
    }
    document.querySelector('.panel').innerText = input;
    document.querySelector('.input').value = '';
    document.querySelector('.notification').classList.add('notification_active');
    console.log(document.querySelector('.notification').getAttribute('class'));
    document.querySelector('.notification').getAttribute('class');
    document.querySelector('.notification').setAttribute('key', '1')
}

function inputChanged(e) {
    if (e.code == 'Enter') {
        submitForm();
    }
}