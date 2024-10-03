"use strict";import ScrollBackground from"./ScrollBackground.js";import PictureGallery from"./PicGallery.js";import GalleryView from"./GalleryView.js";import FormData from"./FormData.js";import PerformanceSideData from"./PerformanceSideData.js";let runState=!1;document.addEventListener("wheel",e=>{const t=new ScrollBackground;t.start(e)}),runState||document.addEventListener("touchstart",e=>{const t=new ScrollBackground;t.start(e,runState)}),document.addEventListener("DOMContentLoaded",()=>{const e=new PictureGallery;e.htmlContentCheck();const t=new GalleryView;t.iterateOverClickableImages()});const formdataStart=new FormData;formdataStart.start();const performanceSide=new PerformanceSideData;performanceSide.checkInfo();