'use strict';

// Logik für die Backgroundimage Scrollanimation

let backgroundImage = document.getElementById('background-image');

document.addEventListener('wheel', function (e) {
    if (e.deltaY > 0 && window.screen.width > 1100) {
        backgroundImage.setAttribute('style', 'background-position: 0 -550px');
    } else if (e.deltaY < 0 && window.screen.width > 1100) {
        backgroundImage.setAttribute('style', 'background-position: 0 0');
    } else if (
        e.deltaY > 0 &&
        window.screen.width < 1100 &&
        window.screen.width > 790
    ) {
        backgroundImage.setAttribute('style', 'background-position: 0 -400px');
    } else if (
        e.deltaY < 0 &&
        window.screen.width < 1100 &&
        window.screen.width > 790
    ) {
        backgroundImage.setAttribute('style', 'background-position: 0 0');
    } else if (
        e.deltaY > 0 &&
        window.screen.width < 790 &&
        window.screen.width > 480
    ) {
        backgroundImage.setAttribute('style', 'background-position: 0 -250px');
    } else if (
        e.deltaY < 0 &&
        window.screen.width < 790 &&
        window.screen.width > 480
    ) {
        backgroundImage.setAttribute('style', 'background-position: 0 150px');
    } else if (e.deltaY > 0 && window.screen.width < 480) {
        backgroundImage.setAttribute('style', 'background-position: -40px 0');
        // bei 480px lässt sich das image nicht mehr abhängig von der viewportgröße skalieren
        // backgroundImage.setAttribute('style', 'width: 70%');

        // Beim Seitenwechsel unter 480px kommt es zum seitlichem verrücken des Background-images.
        // Den letzten Schritt unter 480px überprüfen und ggf.
        // mittels CSS und "Display: none" Background-image abschalten,
        // um dann ein anderes angepasstes Background-image einzufügen,
        // Welches dann mit "display: cover" wieder der Fenstergröße entsprechend angepasst werden kann.
    }
});

document.addEventListener('touchstart', function () {}, true);

// BILDERGALERIE

/**
 * Ein Bilder-Objekt mit vier Arrays,
 * welche Dateipfade zu den einzelnen Bildern
 * der jeweiligen Bildergalerien enthält.
 */

const bilderObjekt = {
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

// Selektieren und halten (Variable) des Galerie-Bereichs
let checkGalerieSide = document.querySelector('#galerie-bereich');

/**
 * Die htmlContentCheck-Funktion erhält in einer Anweisung den Galerie-Bereich und prüft diesen auf Existens (true/false),
 * wenn der Bereich existiert, wird die nächste Funktion aufgerufen.
 */

function htmlContentCheck() {
    if (checkGalerieSide) {
        iteratePicObject();
    }
}

/**
 *Die iteratePicObject-Funktion hält in einer Konstanten die Schlüssel des Objektes (Namen der Arrays).
 *Mit der For-Of-Schleife wird über die Werte des bilderObjekt`s (Key`s der einzelnen Array`s) iteriert und
 *in einer Konstanten gehalten, diese Konstante wird an die nächste Funktion als Parameter übergeben.
 *@param {*enthält den Array-Schlüssel des gerade iterierten Wertes im Objekt}
 */

function iteratePicObject() {
    const eigenschaften = Object.keys(bilderObjekt);

    for (const eigenschaft of eigenschaften) {
        const objProp = eigenschaft;
        processArrKeyInHtmlCompatContent(objProp);
    }
}

/**
 *Die processArrKeyInHtmlCompatContent-Funktion bekommt über einen Parameter den Array-Schlüssel übergeben.
 *Erstellt zwei Variablen und definiert diese als String.
 *Eine else-if-Anweisung prüft nun den Parameter auf Inhalt und
 *setzt bei übereinstimmung den jeweiligen Wert in die vorher erstellte Variable ein,
 *die wiederum an zwei Funktionen mit jeweils zwei Parametern übergeben werden
 * @param {*enthält den Array-Schlüssel} arrId
 */

function processArrKeyInHtmlCompatContent(arrId) {
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

    buildHtmlContent(imgIdString, headLineContent);
    insertImages(arrId, imgIdString);
}

/**
 * Diese Funktion erhält über die beiden Untenstehenden Parameter den Wert für die ID
 * des jeweiligen Galerie-Containers und den Überschriften-Namen der einzelnen Galerien.
 * Es wird der Bereich für die Bildergalerie im HTML in einer Variable gehalten,
 * dann werden Div-Container erstellt, jedes davon erhält eine ID und ein Class-Attribut.
 * Als nächstes wird ein h1-tag für die Überschrift erstellt und
 * erhält den Parameter headLineContent als Content.
 * Alle erstellten Elemente werden eingefügt.
 * @param {*enthält den zuvor ausgewerteten ID-Namen für den Container} imgIdString
 * @param {*enthält den zuvor ausgewerteten Content für das h1-tag} headLineContent
 */

function buildHtmlContent(imgIdString, headLineContent) {
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
 * Danach wird das HTML Gerüst erstellt und die Iterations-Werte eingetragen und dann ins HTML eingefügt
 * @param {*enthält den Array-Schlüssel} arrKey
 * @param {*enthält den zuvor ausgewerteten ID-String für den Container} conId
 */

function insertImages(arrKey, conId) {
    const container = document.getElementById(conId);

    for (let i = 0; i < bilderObjekt[arrKey].length; i++) {
        const imageSrc = bilderObjekt[arrKey][i];

        const anchorElement = document.createElement('a');
        anchorElement.href = imageSrc;

        const imageElement = document.createElement('img');
        imageElement.setAttribute('class', 'clickable-image');
        imageElement.setAttribute(`id`, `${arrKey + `-` + i}`);
        imageElement.src = imageSrc;
        console.log(imageElement);
        anchorElement.appendChild(imageElement);

        container.appendChild(anchorElement);
    }
}

htmlContentCheck();

// Logik Bilder Großansicht
// Die verschiedenen Logiken (Hintergrundbild-Animation,
// Galerie-Aufbau und Großansicht) sollten in seperaten Dateien abgelegt werden,
// um die Übersichtlichkeit zu gewährleisten.

const galleryViewContainer = document.querySelector('.galerie-view-container');
const closeButton = document.querySelector('.close-button');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

let currentIndex = 0;
let imgPath;

function showImage(arrName, index) {
    const viewImage = document.querySelector('.image-view-container img');
    viewImage.src = arrName[index];
}

function showGallery(idToArrName) {
    console.log(idToArrName);
    galleryViewContainer.style.display = 'block';
    showImage(idToArrName, currentIndex);
}

function closeGallery() {
    galleryViewContainer.style.display = 'none';
}

if (closeButton) {
    closeButton.addEventListener('click', closeGallery);
}

if (prevButton) {
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + imgPath.length) % imgPath.length;
        showImage(currentIndex);
    });
}

if (nextButton) {
    nextButton.addEventListener('click', () => {
        // Das ImageArray wurde entfernt und
        // einer Variablen (imgPath) das geklickte Bild und alle Bilder in diesem Array übergeben
        // leider lädt er die Bilder nicht und erhält einen Error
        console.log(imgPath);
        currentIndex = (currentIndex + 1) % imgPath.length;
        showImage(currentIndex);
    });
}

function iterateOverClickableImages() {
    const clickableImages = document.querySelectorAll('.clickable-image');

    clickableImages.forEach(function (image) {
        image.addEventListener('click', function (e) {
            e.preventDefault();

            clickedImage(e);
        });
    });
}

// Bild ID oder evtl. den Bildpfad abgreifen und für die Galeriefunktion einsetzen

function clickedImage(event) {
    const imageClicked = event.target;
    const imageId = imageClicked.id;
    idToValidArrNameAndIndex(imageId);
}

function idToValidArrNameAndIndex(galleryImgIdString) {
    const splitId = galleryImgIdString.split('-');
    const unvalidArrName = splitId[0];
    let validArrName;
    if (unvalidArrName === 'specialPicArray') {
        validArrName = bilderObjekt.specialPicArray;
    } else if (unvalidArrName === 'weddingPicArray') {
        validArrName = bilderObjekt.weddingPicArray;
    } else if (unvalidArrName === 'eventsPicArray') {
        validArrName = bilderObjekt.eventsPicArray;
    } else if (unvalidArrName === 'shootingPicArray') {
        validArrName = bilderObjekt.shootingPicArray;
    }
    imgPath = validArrName;
    console.log(imgPath);
    const saveImgIndex = Number(splitId[1]);
    currentIndex = saveImgIndex;

    showGallery(validArrName);
}

// Warten, bis das DOM vollständig geladen ist
document.addEventListener('DOMContentLoaded', function () {
    iterateOverClickableImages();
});
