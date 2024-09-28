"use strict"

export default class PictureGallery {
    constructor() {

        this.galOnePicPath = './src/img/galerie-bibliothek/gallery_1/';
        this.galTwoPicPath = './src/img/galerie-bibliothek/gallery_2/';
        this.galThreePicPath = './src/img/galerie-bibliothek/gallery_3/';
        this.galFourPicPath = './src/img/galerie-bibliothek/gallery_4/';

        this.forThumbnails = 'thumbnails/';

        /**
         * Ein Bilder-Objekt mit vier Arrays,
         * welche Dateipfade zu den einzelnen Bildern
         * der jeweiligen Bildergalerien enthält.
         */
        this.picObject = {
            galOnePicArray: [
                "gallery_1_001.avif",
                "gallery_1_002.avif",
                "gallery_1_003.avif",
                "gallery_1_004.avif",
                "gallery_1_005.avif",
                "gallery_1_006.avif",
                "gallery_1_007.avif",
                "gallery_1_008.avif",
                "gallery_1_009.avif",
            ],

            galTwoPicArray: [
                "gallery_2_001.avif",
                "gallery_2_002.avif",
                "gallery_2_003.avif",
                "gallery_2_004.avif",
                "gallery_2_005.avif",
                "gallery_2_006.avif",
                "gallery_2_007.avif",
                "gallery_2_008.avif",
                "gallery_2_009.avif",
            ],

            galThreePicArray: [
                "gallery_3_001.avif",
                "gallery_3_002.avif",
                "gallery_3_003.avif",
                "gallery_3_004.avif",
                "gallery_3_005.avif",
                "gallery_3_006.avif",
                "gallery_3_007.avif",
                "gallery_3_008.avif",
                "gallery_3_009.avif",
            ],

            galFourPicArray: [
                "gallery_4_001.avif",
                "gallery_4_002.avif",
                "gallery_4_003.avif",
                "gallery_4_004.avif",
                "gallery_4_005.avif",
                "gallery_4_006.avif",
                "gallery_4_007.avif",
                "gallery_4_008.avif",
                "gallery_4_009.avif",
            ],
        };
        
        this.checkGalerieSide = document.querySelector('#gallery-area');
    }

    /**
     * Die htmlContentCheck-Funktion erhält in einer Anweisung den Galerie-Bereich und prüft diesen auf Existenz (true/false),
     * wenn der Bereich existiert, wird die nächste Funktion aufgerufen.
     */
    htmlContentCheck() {
        if (this.checkGalerieSide) {
            this.iteratePicObject();
        }
    }

    /**
     *Die iteratePicObject-Funktion hält in einer Konstante die Schlüssel des Objektes (Namen der Arrays).
     *Mit der For-Of-Schleife wird über die Werte des picObject's (Key's der einzelnen Array's) iteriert und
     *in einer Konstante gehalten; diese Konstante wird an die nächste Funktion als Parameter übergeben.
     */
    iteratePicObject() {
        const picObjectProps = Object.keys(this.picObject);

        for (const property of picObjectProps) {
            const objProp = property;
            this.processArrKeyInHtmlCompatContent(objProp);
        }
    }

    /**
     * Die Funktion liest die Bildernamen aus den Arrays aus und gibt diese mit einem Content für die Überschrift
     * und dem entsprechenden Pfad
     * an die nächsten Funktionen weiter.
     * Der Pfad wird separat gesetzt, um die Thumbnails und Einzelansicht separat ansteuern zu können.
     * @param {enthält den Array-Schlüssel} arrId
     */

    processArrKeyInHtmlCompatContent(arrId) {
        let imgIdString = '';
        let imgAltContent = '';
        let headLineContent = '';
        let picPath = '';

        switch (arrId) {
            case 'galOnePicArray':
                imgIdString = 'gallery-1';
                imgAltContent = 'Bild in der besondere Fotogalerie'
                headLineContent = 'Besondere Fotogalerie';
                picPath = this.galOnePicPath;
                break;
            case 'galTwoPicArray':
                imgIdString = 'gallery-2';
                imgAltContent = 'Bild in der Architektur Fotogalerie'
                headLineContent = 'Architektur Galerie';
                picPath = this.galTwoPicPath;
                break;
            case 'galThreePicArray':
                imgIdString = 'gallery-3';
                imgAltContent = 'Bild in der Event Fotogalerie'
                headLineContent = 'Event Galerie';
                picPath = this.galThreePicPath;
                break;
            case 'galFourPicArray':
                imgIdString = 'gallery-4';
                imgAltContent = 'Bild in der Shooting Fotogalerie'
                headLineContent = 'Fotoshooting Galerie';
                picPath = this.galFourPicPath;
                break;
        }
        this.buildHtmlContent(imgIdString, headLineContent);
        this.insertImages(arrId, imgIdString, picPath, imgAltContent);
    }

    /**
     * Die Funktion erstellt im Galerie-Bereich einen Container für die einzelnen Bildergalerien 
     * und fügt die passende Überschrift und die einzelnen Bilder ein.
     * @param {*enthält den zuvor ausgewerteten ID-Namen für den Container} imgIdString
     * @param {*enthält den zuvor ausgewerteten Content für das h1-tag} headLineContent
     */
    buildHtmlContent(imgIdString, headLineContent) {
        let picArea = document.getElementById('gallery-area');

        let imgContainer = document.createElement('div');
        imgContainer.setAttribute('id', imgIdString);
        imgContainer.classList.add('style-img-container');

        let headLine = document.createElement('h1');
        headLine.textContent = headLineContent;

        imgContainer.insertAdjacentElement('afterbegin', headLine);
        picArea.appendChild(imgContainer);
    }

    /**
     * Die Funktion iteriert über die Bilder-Arrays im Bilder-Objekt
     * und speichert den aktuellen Iterations-Wert in einer Variable.
     * Der Pfad wird zusammengefügt.
     * Danach wird das HTML-Gerüst erstellt und die Iterations-Werte eingetragen und im HTML eingefügt.
     * @param {string} arrKey enthält den Schlüssel für das Array
     * @param {string} conId enthält den ID-String für die einzelne Galerie
     * @param {string} path enthält den Pfad zum Bild
     */

    insertImages(arrKey, conId, path, altContent) {
        const container = document.getElementById(conId);

        for (let i = 0; i < this.picObject[arrKey].length; i++) {
            const imageName = this.picObject[arrKey][i];
            const imageSrc = path + this.forThumbnails + imageName;
            

            const anchorElement = document.createElement('a');
            anchorElement.href = imageSrc;

            const imageElement = document.createElement('img');
            imageElement.setAttribute('class', 'clickable-image');
            imageElement.setAttribute(`id`, `${arrKey + `-` + i}`);
            imageElement.src = imageSrc;
            imageElement.setAttribute('alt', altContent);
            imageElement.loading = 'lazy';
            anchorElement.appendChild(imageElement);

            container.appendChild(anchorElement);
        }
    }
}
