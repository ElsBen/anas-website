"use strict"

import PictureGallery from './PicGallery.js';

export default class GalleryView {
    constructor() {
        this.pictureArrays = new PictureGallery();
        /**
         * Die Variablen für die Galeriesteuerung, Bilder-Arrays und Container für die Großansicht wurden 
         * global gesetzt, damit die einzelnen Funktionen darauf Zugriff haben.
         */

        this.galleryViewContainer = document.querySelector(
            '.gallery-view-container',
        );
        this.closeButton = document.querySelector('.close-button');
        this.prevButton = document.querySelector('.prev-button');
        this.nextButton = document.querySelector('.next-button');
        this.closePrevNextGallery();

        /**
         * Current-Index bekommt den Wert im Array als Zähler für die Bildervorschau.
         * In imgName wird das komplette Array, in dem sich das Bild, welches vom User geklickt wurde, gehalten.
         */
        this.currentIndex = 0;
        this.imgName;
        this.dirPath;
    }


    /**
     * Die Funktion setzt den Pfad zum Bild in das img-tag ein.
     * @param {string[]} arrName Dieser Parameter enthält den Namen des ausgwählten Arrays
     * @param {number} index Erhält den ausgewählten Index des Bildes im jeweiligen Array
     */
    showImage(arrName, index) {
        const compPicPath = this.dirPath + arrName[index]
        const viewImage = document.querySelector('.image-view-container img');
        viewImage.src = compPicPath;
    }

    /**
     * Die Funktion zum Aufrufen der Großansicht der Bilder.
     * @param {string[]} idToArrName Enthält den Namen des ausgewählten Arrays in dem sich das Bild befindet.
     */
    showGallery(idToArrName) {
        this.galleryViewContainer.style.display = 'flex';
        this.showImage(idToArrName, this.currentIndex);
    }

    /**
     * Diese Funktion sorgt dafür, dass sich das Galeriefenster beim Klicken des X-Buttons schließt,
     * indem es mit style.display auf den CSS-Wert Display zugreift und ihn auf none setzt.
     * Events für die Interaktion mit dem User bei Klick auf die Bildernavigation (Bild vor und zurück).
     * @param {number} currentIndex enthält den neu errechenten Index im ausgewählten Array
     * @param {string[]} imgName enthält die Variable in dem das ausgewählte Array geschrieben wurde
     */
    closePrevNextGallery() {

        if (this.closeButton && this.prevButton && this.nextButton) {
            this.closeButton.addEventListener('click', () => {
                this.galleryViewContainer.style.display = 'none';
            });

            this.prevButton.addEventListener('click', () => {
                this.currentIndex =
                    (this.currentIndex - 1 + this.imgName.length) %
                    this.imgName.length;
                this.showImage(this.imgName, this.currentIndex);
            });

            this.nextButton.addEventListener('click', () => {
                this.currentIndex =
                    (this.currentIndex + 1) % this.imgName.length;
                this.showImage(this.imgName, this.currentIndex);
            });
        }
    }

    /**
     * Funktion selektiert alle Klickbaren Bilder und iteriert darüber, 
     * um bei jedem Bild einen Eventlistener zu setzen.
     *@param {Element} image Steht für jedes einzelne Bild mit der Klasse .clickable-image das ausgewählt wurde.
     */
    iterateOverClickableImages() {
        const clickableImages = document.querySelectorAll('.clickable-image');

        clickableImages.forEach((image) => {
            image.addEventListener('click', (e) => {
                e.preventDefault();
                this.clickedImage(e);
            });
        });
    }

    /**
     * Die Funktion holt sich die ID des Geklickten Bildes und gibt es an die Nächste Funktion weiter.
     * @param {event} event Beinhaltet das übergebene Klickevent (Info`s über geklickten Content)
     */
    clickedImage(event) {
        const imageClicked = event.target;
        const imageId = imageClicked.id;
        this.idToValidArrNameAndIndex(imageId);
    }

    /**
     * Funktion welche den Arraynamen und den Index des Bildes übergeben bekommt und Validiert.
     * Das geklickte Bild wird übergeben.
     * @param {string} galleryImgIdString Beinhaltet die ID des geklickten Bildes.
     */
    idToValidArrNameAndIndex(galleryImgIdString) {
        const splitId = galleryImgIdString.split('-');
        const unvalidArrName = splitId[0];

        let validArrName;

        switch (unvalidArrName){
            case 'galOnePicArray':
                validArrName = this.pictureArrays.picObject.galOnePicArray;
                this.dirPath = this.pictureArrays.galOnePicPath;
                break;
            case 'galTwoPicArray':
                validArrName = this.pictureArrays.picObject.galTwoPicArray;
                this.dirPath = this.pictureArrays.galTwoPicPath;
                break;
            case 'galThreePicArray':
                validArrName = this.pictureArrays.picObject.galThreePicArray;
                this.dirPath = this.pictureArrays.galThreePicPath;
                break;
            case 'galFourPicArray':
                validArrName = this.pictureArrays.picObject.galFourPicArray;
                this.dirPath = this.pictureArrays.galFourPicPath;
                break;
        }
        
        this.imgName = validArrName;
        const saveImgIndex = Number(splitId[1]);
        this.currentIndex = saveImgIndex;
        this.showGallery(validArrName);
    }
}
