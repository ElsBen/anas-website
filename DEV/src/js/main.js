'use strict';

import ScrollBackground from './ScrollBackground.js';
import PictureGallery from './PicGallery.js';
import GalleryView from './GalleryView.js';
import FormData from './FormData.js';
import PerformanceSideData from './PerformanceSideData.js';

// Logik für die Backgroundimage Scroll-Animation.
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
 * Mit diesem Eventlistener wird abgewartet, damit das DOM vollständig geladen wird,
 * bevor die Logik für die Galerie ausgeführt wird.
 */
document.addEventListener('DOMContentLoaded', () => {
    const picGalerieStart = new PictureGallery();
    picGalerieStart.htmlContentCheck();

    const galerieViewStart = new GalleryView();
    galerieViewStart.iterateOverClickableImages();
});

// Logik (Aufruf) für das Validieren und Erstellen der Formulardaten.

const formdataStart = new FormData();
formdataStart.start();

// PERFORMANCE-SIDE

const performanceSide = new PerformanceSideData();
performanceSide.checkInfo();