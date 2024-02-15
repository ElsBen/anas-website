'use strict';

import Scrollanimation from './Scrollbackground.js';
import Picturegalerie from './Picgalerie.js';
import Galerieview from './Galerieview.js';
import Formdata from './Formdata.js';

// Logik für die Backgroundimage Scrollanimation

document.addEventListener('wheel', function (e) {
    const backgroundAnimation = new Scrollanimation();
    backgroundAnimation.start(e);
});

// BILDERGALERIE

/**
 * Mit diesem Eventlistener wir abgewartet bis das DOM vollständig geladen wurde,
 * dann erst wird die erste Funktion gestartet.
 */
document.addEventListener('DOMContentLoaded', function () {
    const picGalerieStart = new Picturegalerie();
    picGalerieStart.htmlContentCheck();

    const galerieViewStart = new Galerieview();
    galerieViewStart.iterateOverClickableImages();
});

// Logik (Aufruf) für das validieren und erstellen der Formulardaten

const formdataStart = new Formdata();
formdataStart.start();

// Einige Geräte brauchen den unten stehenden Code, damit auf die touch-Befehle reagiert werden kann.
document.addEventListener('touchstart', function () {}, true);
