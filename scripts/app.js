'use strict';

let habbits = [];
const HABBIT_KEY = 'HABBIT_KEY'
let globalActivehabbitId;

/* page */

const page = {
    menu: document.querySelector('.menu__list'),
    header: {
        h1: document.querySelector('.h1'),
        progressPercent: document.querySelector('.progress__percent'),
        progressCoverBar: document.querySelector('.progress__cover-bar'),
    },
    content: {
        days: document.querySelector('.days'),
        lastDay: document.getElementById('lastday'),
    },
    popup: {
        cover: document.querySelector('.cover'),
        iconField: document.querySelector('.popup__form input[name="icon"]')
    }
}
/* utils */

function loadData() {
    const habbitString = localStorage.getItem(HABBIT_KEY);
    const habbitArray = JSON.parse(habbitString);
    if (Array.isArray(habbitArray)) {
        habbits = habbitArray;
    }
}

function saveData() {
    localStorage.setItem(HABBIT_KEY, JSON.stringify(habbits));
}

/* render */

function rerenderMenu(activeHabbit) {
    if (!activeHabbit) {
        return;
    }
    for (const habbit of habbits) {
        const existed = document.querySelector(`[menu-habbit-id="${habbit.id}"]`);
        if (!existed) {
            const element = document.createElement('button');
            element.setAttribute('menu-habbit-id', habbit.id);
            element.classList.add('menu__item');
            element.addEventListener('click', () => rerender(habbit.id))
            element.innerHTML = `<img src="./images/${habbit.icon}.svg" alt=${habbit.name} />`
            if (activeHabbit.id === habbit.id) {
                element.classList.add('menu__item_active');
            }
            page.menu.appendChild(element);
            continue;
        }
        if (activeHabbit.id === habbit.id) {
            existed.classList.add('menu__item_active');
        } else {
            existed.classList.remove('menu__item_active')
        }
    }
}

function rerenderHead(activeHabbit) {
    if (!activeHabbit) {
        return;
    }
    page.header.h1.innerHTML = activeHabbit.name;
    const progress = activeHabbit.days.length / activeHabbit.target > 1
        ? 100
        : activeHabbit.days.length / activeHabbit.target * 100;
    page.header.progressPercent.innerHTML = progress.toFixed(0) + '%';
    page.header.progressCoverBar.setAttribute('style', `width: ${progress}%`)
}

function rerenderContent(activeHabbit) {
    if (!activeHabbit) {
        return;
    }
    page.content.days.innerHTML = '';

    const days = activeHabbit.days;
    for (let i = 0; i < days.length; i++) {
        const habbit = document.createElement('div');
        habbit.setAttribute('class', 'habbit');
        page.content.days.appendChild(habbit);

        const habbitDay = document.createElement('div');
        const habbitComment = document.createElement('div');
        const habbitDelete = document.createElement('button');

        habbitDay.setAttribute('class', 'habbit__day');
        habbitComment.setAttribute('class', 'habbit__comment');
        habbitDelete.setAttribute('class', 'habbit__delete');
        habbitDelete.setAttribute('onClick', `deleteDay(${i})`);
        habbitDay.innerText = `День ${i + 1}`;
        habbitComment.innerText = days[i].comment;
        habbitDelete.innerHTML = `<img src="./images/delete.svg" alt="Удалить день ${i + 1}"/>`;

        habbit.appendChild(habbitDay);
        habbit.appendChild(habbitComment);
        habbit.appendChild(habbitDelete);
    }
    page.content.lastDay.innerText = `День ${activeHabbit.days.length + 1}`;
}

function rerender(activeHabbitId) {

    globalActivehabbitId = activeHabbitId;
    console.log(habbits);
    const activeHabbit = habbits.find(habbit => habbit.id === activeHabbitId);
    rerenderMenu(activeHabbit);
    rerenderHead(activeHabbit);
    rerenderContent(activeHabbit);
}

/* work with days */

function addDays(event) {
    const form = event.target;
    event.preventDefault();
    const data = new FormData(event.target);
    const comment = data.get('comment'); //По артрибуту name
    form['comment'].classList.remove('error');

    if (!comment) {
        form['comment'].classList.add('error');
    }
    habbits = habbits.map(habbit => {
        if (habbit.id === globalActivehabbitId) {
            return {
                ...habbit,
                days: habbit.days.concat([{ comment }])
            }
        }
        return habbit;
    })
    rerender(globalActivehabbitId);
    form['comment'].value = '';
    saveData();
}

function deleteDay(i) {
    habbits = habbits.map(habbit => {
        if (habbit.id === globalActivehabbitId) {
            habbit.days.splice(i, 1);
            console.log({
                ...habbit
            });
            return {
                ...habbit,
                days: habbit.days
            };
        }
        return habbit;
        console.log(`habbits in deleteDay: ${habbits}`);
    })
    rerender(globalActivehabbitId);
    saveData();
}

function togglePopup() {
    page.popup.cover.classList.toggle("cover_hidden");
}

/* working with habbits */

function setIcon(context, icon) {
    page.popup.iconField.value = icon;
    const activeIcon = document.querySelector('.icon.icon_active');
    activeIcon.classList.remove('icon_active');
    context.classList.add('icon_active');
}

/* init */

(() => {
    loadData();
    rerender(habbits[0].id);
})()

