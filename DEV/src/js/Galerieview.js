import Picturegalerie from './Picgalerie.js';

export default class Galerieview {
    constructor() {
        this.pictureArrays = new Picturegalerie();
        /**
         * Die Variablen für die Galeriesteuerung, Bilder-Arrays und container für die Großansicht wurden 
         * Global gesetzt, damit die einzelnen Funktionen darauf Zugriff haben.
         */

        this.galleryViewContainer = document.querySelector(
            '.gallery-view-container',
        );
        this.closeButton = document.querySelector('.close-button');
        this.prevButton = document.querySelector('.prev-button');
        this.nextButton = document.querySelector('.next-button');
        this.closePrevNextGallery();

        /**
         * currentIndex bekommt den wert im Array als Zähler für die Bildervorschau,
         * in imgPath wird das komplette Array, in dem sich das Bild welches vom User geklickt wurde, gehalten.
         */
        this.currentIndex = 0;
        this.imgPath;
    }

    /**
     *Funktion setzt den Pfad zum Bild in das img-tag ein
     * @param {*diese Parameter enthält den Namen des ausgwählten Arrays} arrName
     * @param {*erhält den ausgewählten Index des Bildes im jeweiligen Array} index
     */

    showImage(arrName, index) {
        const viewImage = document.querySelector('.image-view-container img');
        viewImage.src = arrName[index];
    }

    /**
     * Funktion zum aufrufen der Großansicht der Bilder.
     * @param {*enthält den Namen des ausgewählten Arrays in dem sich das Bild befindet} idToArrName
     * @param {*diesem Parameter wird der Index des ausgewählten Bildes im jeweiligen Array übergeben}
     */
    showGallery(idToArrName) {
        this.galleryViewContainer.style.display = 'flex';
        this.showImage(idToArrName, this.currentIndex);
    }

    /**
     * Diese Funktion sorgt dafür das sich dass Galleriefenster beim klicken des X-Buttons schließt,
     * indem es mit style.display auf den CSS-Wert diplay zugreift und ihn auf none setzt.
     * Events für die Interaktion mit dem User bei klick auf die Bildernavigation ( Bild vor und zurück).
     * @param {*enthält den neu errechenten Index im ausgewählten Array} currentIndex
     * @param {*enthält die Variable in dem das ausgewählte Array geschrieben wurde} imgPath
     */
    closePrevNextGallery() {

        if (this.closeButton && this.prevButton && this.nextButton) {
            this.closeButton.addEventListener('click', () => {
                this.galleryViewContainer.style.display = 'none';
            });

            this.prevButton.addEventListener('click', () => {
                this.currentIndex =
                    (this.currentIndex - 1 + this.imgPath.length) %
                    this.imgPath.length;
                this.showImage(this.imgPath, this.currentIndex);
            });

            this.nextButton.addEventListener('click', () => {
                this.currentIndex =
                    (this.currentIndex + 1) % this.imgPath.length;
                this.showImage(this.imgPath, this.currentIndex);
            });
        }
    }

    /**
     * Funktion selektiert alle Klickbaren Bilder und iteriert darüber, 
     * um bei jedem Bild einen Eventlistener zu setzen.
     *@param {*steht für jedes einzelne Bild mit der Klasse .clickable-image das ausgewählt wurde} image
     *@param {*dieser Parameter steht für das Klickevent} e
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
     * @param {*beinhaltet das Klickevent (Info`s über geklickten Content)} event
     */
    clickedImage(event) {
        const imageClicked = event.target;
        const imageId = imageClicked.id;
        this.idToValidArrNameAndIndex(imageId);
    }

    /**
     * Funktion welche den Arraynamen und den Index des Bildes übergeben bekommt und Validiert.
     * Das geklickte Bild wird übergeben.
     * @param {*beinhaltet die ID des geklickten Bildes} galleryImgIdString
     */
    idToValidArrNameAndIndex(galleryImgIdString) {
        const splitId = galleryImgIdString.split('-');
        const unvalidArrName = splitId[0];

        let validArrName;

        // auf switch case umstellen!!!
        if (unvalidArrName === 'specialPicArray') {
            validArrName = this.pictureArrays.bilderObjekt.specialPicArray;
        } else if (unvalidArrName === 'weddingPicArray') {
            validArrName = this.pictureArrays.bilderObjekt.weddingPicArray;
        } else if (unvalidArrName === 'eventsPicArray') {
            validArrName = this.pictureArrays.bilderObjekt.eventsPicArray;
        } else if (unvalidArrName === 'shootingPicArray') {
            validArrName = this.pictureArrays.bilderObjekt.shootingPicArray;
        }
        
        this.imgPath = validArrName;
        const saveImgIndex = Number(splitId[1]);
        this.currentIndex = saveImgIndex;
        this.showGallery(validArrName);
    }
}
