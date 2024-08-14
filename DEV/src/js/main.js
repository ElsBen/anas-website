'use strict';

import ScrollBackground from './ScrollBackground.js';
import PictureGallery from './PicGallery.js';
import GalleryView from './GalleryView.js';
import FormData from './FormData.js';
import PerformanceSideData from './PerformanceSideData.js';

// Logik für die Backgroundimage Scrollanimation
let runState = false;

document.addEventListener('wheel',(e) => {
    const backgroundAnimation = new ScrollBackground();
    backgroundAnimation.start(e);
});

if(!runState){
    document.addEventListener('touchstart', (e) => {
        const backgroundAnimation = new ScrollBackground();
        backgroundAnimation.start(e, runState);
    });
};


// PICTURE-GALLERY

/**
 * Mit diesem Eventlistener wird abgewartet damit das DOM vollständig geladen wird,
 * bevor die Logik für die Galerie ausgeführt wird.
 */
document.addEventListener('DOMContentLoaded', () => {
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
// document.addEventListener('touchstart',() => {}, true);