export default class Picturegalerie {
    constructor() {
        /**
         * Ein Bilder-Objekt mit vier Arrays,
         * welche Dateipfade zu den einzelnen Bildern
         * der jeweiligen Bildergalerien enthält.
         */
        this.bilderObjekt = {
            specialPicArray: [
                './src/img/galerie-bibliothek/besonderes/special001.jpg',
                './src/img/galerie-bibliothek/besonderes/special002.jpg',
                './src/img/galerie-bibliothek/besonderes/special003.jpg',
                './src/img/galerie-bibliothek/besonderes/special004.jpg',
                './src/img/galerie-bibliothek/besonderes/special005.jpg',
                './src/img/galerie-bibliothek/besonderes/special006.jpg',
                './src/img/galerie-bibliothek/besonderes/special007.jpg',
                './src/img/galerie-bibliothek/besonderes/special008.jpg',
                './src/img/galerie-bibliothek/besonderes/special009.jpg',
            ],

            weddingPicArray: [
                './src/img/galerie-bibliothek/hochzeiten/wedding001.jpg',
                './src/img/galerie-bibliothek/hochzeiten/wedding002.jpg',
                './src/img/galerie-bibliothek/hochzeiten/wedding003.jpg',
                './src/img/galerie-bibliothek/hochzeiten/wedding004.jpg',
                './src/img/galerie-bibliothek/hochzeiten/wedding005.jpg',
                './src/img/galerie-bibliothek/hochzeiten/wedding006.jpg',
                './src/img/galerie-bibliothek/hochzeiten/wedding007.jpg',
                './src/img/galerie-bibliothek/hochzeiten/wedding008.jpg',
                './src/img/galerie-bibliothek/hochzeiten/wedding009.jpg',
            ],

            eventsPicArray: [
                './src/img/galerie-bibliothek/events/event001.jpg',
                './src/img/galerie-bibliothek/events/event002.jpg',
                './src/img/galerie-bibliothek/events/event003.jpg',
                './src/img/galerie-bibliothek/events/event004.jpg',
                './src/img/galerie-bibliothek/events/event005.jpg',
                './src/img/galerie-bibliothek/events/event006.jpg',
                './src/img/galerie-bibliothek/events/event007.jpg',
                './src/img/galerie-bibliothek/events/event008.jpg',
                './src/img/galerie-bibliothek/events/event009.jpg',
            ],

            shootingPicArray: [
                './src/img/galerie-bibliothek/shootings/shooting001.jpg',
                './src/img/galerie-bibliothek/shootings/shooting002.jpg',
                './src/img/galerie-bibliothek/shootings/shooting003.jpg',
                './src/img/galerie-bibliothek/shootings/shooting004.jpg',
                './src/img/galerie-bibliothek/shootings/shooting005.jpg',
                './src/img/galerie-bibliothek/shootings/shooting006.jpg',
                './src/img/galerie-bibliothek/shootings/shooting007.jpg',
                './src/img/galerie-bibliothek/shootings/shooting008.jpg',
                './src/img/galerie-bibliothek/shootings/shooting009.jpg',
            ],
        };

        this.checkGalerieSide = document.querySelector('#galerie-bereich');
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
     * Funktion liest die Pfade aus den Arrays aus und gibt diese mit einem Kontent für die Überschrift
     * an die nächsten Funktionen weiter.
     * @param {*enthält den Array-Schlüssel} arrId
     */

    processArrKeyInHtmlCompatContent(arrId) {
        let imgIdString = '';
        let headLineContent = '';

        if (arrId === 'specialPicArray') {
            imgIdString = 'special-galerie';
            headLineContent = 'Besondere Fotogalerie';
        } else if (arrId === 'weddingPicArray') {
            imgIdString = 'wedding-galerie';
            headLineContent = 'Hochzeits Galerie';
        } else if (arrId === 'eventsPicArray') {
            imgIdString = 'event-galerie';
            headLineContent = 'Event Galerie';
        } else if (arrId === 'shootingPicArray') {
            imgIdString = 'shooting-galerie';
            headLineContent = 'Fotoshooting Galerie';
        }

        this.buildHtmlContent(imgIdString, headLineContent);
        this.insertImages(arrId, imgIdString);
    }

    /**
     * Die Funktion erstellt im Galerie-Bereich einen Kontainer für die einzelnen Bildergalerien 
     * und fügt die passende Überschrift und die einzelnen Bilder ein.
     * @param {*enthält den zuvor ausgewerteten ID-Namen für den Container} imgIdString
     * @param {*enthält den zuvor ausgewerteten Content für das h1-tag} headLineContent
     */
    buildHtmlContent(imgIdString, headLineContent) {
        let picArea = document.getElementById('galerie-bereich');

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
     * Danach wird das HTML Gerüst erstellt und die Iterations-Werte eingetragen und im HTML eingefügt
     * @param {*enthält den Array-Schlüssel} arrKey
     * @param {*enthält den zuvor ausgewerteten ID-String für den Container} conId
     */

    insertImages(arrKey, conId) {
        const container = document.getElementById(conId);

        for (let i = 0; i < this.bilderObjekt[arrKey].length; i++) {
            const imageSrc = this.bilderObjekt[arrKey][i];

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
