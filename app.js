'use strict';

function submitForm() {
    const input = document.querySelector('.input').value;
    if (!input) {
        return;
    }
    document.querySelector('.panel').innerText = input;
    document.querySelector('.input').value = '';
    document.querySelector('.notification').classList.add('notification_active');
}

function inputChanged(e) {
    if (e.code == 'Enter') {
        submitForm();
    }
}

localStorage.setItem('token', 'sjibvnsjt');
localStorage.setItem('token1', 1);
localStorage.setItem('token2', true);

console.log(localStorage.getItem('token2'));

localStorage.removeItem('token1');
localStorage.clear();