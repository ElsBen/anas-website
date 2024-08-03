export default class PictureGallery {
    constructor() {

        // this.specialPicPath = './src/img/galerie-bibliothek/besonderes/';
        // this.weddingPicPath = './src/img/galerie-bibliothek/hochzeiten/';
        // this.eventsPicPath = './src/img/galerie-bibliothek/events/';
        // this.shootingPicPath = './src/img/galerie-bibliothek/shootings/';

        /**
         * Ein Bilder-Objekt mit vier Arrays,
         * welche Dateipfade zu den einzelnen Bildern
         * der jeweiligen Bildergalerien enthält.
         */
        this.bilderObjekt = {
            specialPicArray: [
                "special001.jpg",
                "special002.jpg",
                "special003.jpg",
                "special004.jpg",
                "special005.jpg",
                "special006.jpg",
                "special007.jpg",
                "special008.jpg",
                "special009.jpg",
            ],

            weddingPicArray: [
                "wedding001.jpg",
                "wedding002.jpg",
                "wedding003.jpg",
                "wedding004.jpg",
                "wedding005.jpg",
                "wedding006.jpg",
                "wedding007.jpg",
                "wedding008.jpg",
                "wedding009.jpg",
            ],

            eventsPicArray: [
                "event001.jpg",
                "event002.jpg",
                "event003.jpg",
                "event004.jpg",
                "event005.jpg",
                "event006.jpg",
                "event007.jpg",
                "event008.jpg",
                "event009.jpg",
            ],

            shootingPicArray: [
                "shooting001.jpg",
                "shooting002.jpg",
                "shooting003.jpg",
                "shooting004.jpg",
                "shooting005.jpg",
                "shooting006.jpg",
                "shooting007.jpg",
                "shooting008.jpg",
                "shooting009.jpg",
            ],
        };
        
        this.checkGalerieSide = document.querySelector('#gallery-area');
    }

    /**
     * Die htmlContentCheck-Funktion erhält in einer Anweisung den Galerie-Bereich und prüft diesen auf Existens (true/false),
     * wenn der Bereich existiert, wird die nächste Funktion aufgerufen.
     */
    htmlContentCheck() {
        if (this.checkGalerieSide) {
            this.iteratePicObject();
        }
    }

    /**
     *Die iteratePicObject-Funktion hält in einer Konstanten die Schlüssel des Objektes (Namen der Arrays).
     *Mit der For-Of-Schleife wird über die Werte des bilderObjekt`s (Key`s der einzelnen Array`s) iteriert und
     *in einer Konstanten gehalten, diese Konstante wird an die nächste Funktion als Parameter übergeben.
     *@param {*enthält den Array-Schlüssel des gerade iterierten Wertes im Objekt}
     */
    iteratePicObject() {
        const eigenschaften = Object.keys(this.bilderObjekt);

        for (const eigenschaft of eigenschaften) {
            const objProp = eigenschaft;
            this.processArrKeyInHtmlCompatContent(objProp);
        }
    }

    /**
     * Funktion liest die Bildernamen aus den Arrays aus und gibt diese mit einem Kontent für die Überschrift
     * und dem entsprechenden Pfad
     * an die nächsten Funktionen weiter.
     * Der Pfad wird separat gesetzt um die thumbnails und Einzelansicht separat ansteuern zu können.
     * @param {enthält den Array-Schlüssel} arrId
     */

    processArrKeyInHtmlCompatContent(arrId) {
        let imgIdString = '';
        let headLineContent = '';
        let picPath = '';

        switch (arrId) {
            case 'specialPicArray':
                imgIdString = 'special-galerie';
                headLineContent = 'Besondere Fotogalerie';
                picPath = './src/img/galerie-bibliothek/besonderes/';
                break;
            case 'weddingPicArray':
                imgIdString = 'wedding-galerie';
                headLineContent = 'Hochzeits Galerie';
                picPath = './src/img/galerie-bibliothek/hochzeiten/';
                break;
            case 'eventsPicArray':
                imgIdString = 'event-galerie';
                headLineContent = 'Event Galerie';
                picPath = './src/img/galerie-bibliothek/events/';
                break;
            case 'shootingPicArray':
                imgIdString = 'shooting-galerie';
                headLineContent = 'Fotoshooting Galerie';
                picPath = './src/img/galerie-bibliothek/shootings/';
                break;
        }
        this.buildHtmlContent(imgIdString, headLineContent);
        this.insertImages(arrId, imgIdString, picPath);
    }

    /**
     * Die Funktion erstellt im Galerie-Bereich einen Kontainer für die einzelnen Bildergalerien 
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
     * Funktion Iteriert über die Bilder-Arrays im Bilder-Objekt
     * und speichert den aktuellen Iterations-Wert in einer Variablen.
     * Der Pfad wird zusammengefügt.
     * Danach wird das HTML Gerüst erstellt und die Iterations-Werte eingetragen und im HTML eingefügt
     * @param {string} arrKey enthält den Schlüssel für das Array
     * @param {string} conId enthält den ID-String für die einzelne Galerie
     * @param {string} path enthält den Pfad zum Bild
     */

    insertImages(arrKey, conId, path) {
        const container = document.getElementById(conId);

        for (let i = 0; i < this.bilderObjekt[arrKey].length; i++) {
            const imageName = this.bilderObjekt[arrKey][i];
            const imageSrc = path + imageName;
            console.log(imageSrc);

            const anchorElement = document.createElement('a');
            anchorElement.href = imageSrc;

            const imageElement = document.createElement('img');
            imageElement.setAttribute('class', 'clickable-image');
            imageElement.setAttribute(`id`, `${arrKey + `-` + i}`);
            imageElement.src = imageSrc;
            anchorElement.appendChild(imageElement);

            container.appendChild(anchorElement);
        }
    }
}
