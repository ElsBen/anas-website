'use strict';

import ScrollBackground from './ScrollBackground.js';
import PictureGallery from './PicGallery.js';
import GalleryView from './GalleryView.js';
import FormData from './FormData.js';
import PerformanceSideData from './PerformanceSideData.js';


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



document.addEventListener('DOMContentLoaded', () => {
    const picGalerieStart = new PictureGallery();
    picGalerieStart.htmlContentCheck();

    const galerieViewStart = new GalleryView();
    galerieViewStart.iterateOverClickableImages();
});



const formdataStart = new FormData();
formdataStart.start();



const performanceSide = new PerformanceSideData();
performanceSide.checkInfo();