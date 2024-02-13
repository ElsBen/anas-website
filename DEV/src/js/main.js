'use strict';

import Scrollanimation from './Scrollbackground.js';
import Picturegalerie from './Picgalerie.js';

// Logik für die Backgroundimage Scrollanimation
document.addEventListener('wheel', function (e) {
    const backgroundAnimation = new Scrollanimation();
    backgroundAnimation.start(e);
});

// Einige Geräte brauchen den unten stehenden Code, damit auf die touch-Befehle reagiert werden kann.
document.addEventListener('touchstart', function () {}, true);

// BILDERGALERIE

/**
 * Mit diesem Eventlistener wir abgewartet bis das DOM vollständig geladen wurde,
 * erst dann wird die erste Funktion gestartet.
 */
document.addEventListener('DOMContentLoaded', function () {
    // iterateOverClickableImages(); Hier wäre logik für die Bildergroßansicht nötig!!!
    const loadGalerie = new Picturegalerie();
    loadGalerie.htmlContentCheck();
});

// Logik für das validieren und erstellen der Formulardaten

const form = document.querySelector('#form');

const userEntries = [];

if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const formName = document.querySelector('#name').value;
        const formLastName = document.querySelector('#last-name').value;
        const formEMail = document.querySelector('#email').value;
        const formTelNumber = document.querySelector('#tele-number').value;
        const formMessage = document.querySelector('#message').value;

        const saveEntries = {
            name: formName,
            lastName: formLastName,
            email: formEMail,
            telephone: formTelNumber,
            message: formMessage,
        };

        userEntries.push(saveEntries);
        form.reset();
    });

    //Wird am Schluss nicht mehr benötigt
    setInterval(() => {
        console.log(userEntries);
    }, 10000);
}
