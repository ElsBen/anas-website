'use strict';

import ScrollBackground from './ScrollBackground.js';
import PictureGallery from './PicGallery.js';
import GalleryView from './GalleryView.js';
import FormData from './FormData.js';
import PerformanceSideData from './PerformanceSideData.js';

// Logik für die Backgroundimage Scrollanimation !

document.addEventListener('wheel', function (e) {
    const backgroundAnimation = new ScrollBackground();
    backgroundAnimation.start(e);
});

// PICTURE-GALLERY

/**
 * Mit diesem Eventlistener wir abgewartet bis das DOM vollständig geladen wurde,
 * dann erst wird die erste Funktion gestartet.
 */
document.addEventListener('DOMContentLoaded', function () {
    const picGalerieStart = new PictureGallery();
    picGalerieStart.htmlContentCheck();

    const galerieViewStart = new GalleryView();
    galerieViewStart.iterateOverClickableImages();
});

// Logik (Aufruf) für das validieren und erstellen der Formulardaten

const formdataStart = new FormData();
formdataStart.start();

// PERFORMANCE-SIDE

const performanceSide = new PerformanceSideData();
performanceSide.checkInfo();

// Einige Geräte brauchen den unten stehenden Code, damit auf die touch-Befehle reagiert werden kann.
document.addEventListener('touchstart', function () {}, true);
