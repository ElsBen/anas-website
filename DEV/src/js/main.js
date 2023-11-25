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
        anchorElement.appendChild(imageElement);

        container.appendChild(anchorElement);
    }
}

htmlContentCheck();

// Logik Bilder Großansicht
// Die verschiedenen Logiken (Hintergrundbild-Animation,
// Galerie-Aufbau und Großansicht) sollten in seperaten Dateien abgelegt werden,
// um die Übersichtlichkeit zu gewährleisten.

/**
 * Selektieren und halten des Kontainers und
 * der einzelnen Buttons im HTML für die Bildervorschau
 */
const galleryViewContainer = document.querySelector('.galerie-view-container');
const closeButton = document.querySelector('.close-button');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

/**
 * currentIndex bekommt den wert im Array als Zähler für die Bildervorschau,
 * in imgPath wird das komplette Array, in dem sich das Bild welches vom User geklickt wurde, gehalten.
 */
let currentIndex = 0;
let imgPath;

/**
 *Diese Funktion selektiert das img-tag im .image-view-container und
 *setzt dann über die .src Methode den Pfad des Bildes aus dem jeweiligen Array ein.
 * @param {*diese Parameter enthält den Namen des ausgwählten Arrays} arrName
 * @param {*erhält den ausgewählten Index des Bildes im jeweiligen Array} index
 */
function showImage(arrName, index) {
    // let dontScrollBackground = document.getElementById('galerie-bereich');
    // dontScrollBackground.style.position = 'fixed';
    const viewImage = document.querySelector('.image-view-container img');
    viewImage.src = arrName[index];
}

/**
 * Diese Funktion sorgt dafür das die Großansicht der Bilder angezeigt wird,
 * sie setzt den Display Wert in CSS des gallery-view-containers auf 'block' und
 * ruft die showImage Funktion auf welche zwei Parameter erhält.
 * @param {*enthält den Namen des ausgewählten Arrays in dem sich das Bild befindet} idToArrName
 * @param {*diesem Parameter wird der Index des ausgewählten Bildes im jeweiligen Array übergeben}
 */
function showGallery(idToArrName) {
    galleryViewContainer.style.display = 'block';
    showImage(idToArrName, currentIndex);
}

/**
 * Diese Funktion sorgt dafür das sich dass Galleriefenster beim klicken des X-Buttons schließt,
 * indem es mit style.display auf den CSS-Wert diplay zugreift und ihn auf none setzt.
 */
function closeGallery() {
    galleryViewContainer.style.display = 'none';
}

/**
 * Die Anweisung sorgt dafür das ein Klickevent ausgelöst wird sobald der X-Button geklickt wird,
 * welches dann die Funktion closeGallery aufruft.
 */
if (closeButton) {
    closeButton.addEventListener('click', closeGallery);
}

/**
 * Die Anweisung sorgt dafür das beim klicken des Vorwärtsbuttons,
 * ein event gestartet wird welches mittels einer Rechenoperation
 * den Index des nächsten Bildes im ausgewählten Array ermittelt.
 * Danach wird die nächste Funktion showImage
 * welche zwei Parameter enrhält aufgerufen.
 * @param {*enthält den neu errechenten Index im ausgewählten Array} currentIndex
 * @param {*enthält die Variable in dem das ausgewählte Array geschrieben wurde} imgPath
 */
if (prevButton) {
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + imgPath.length) % imgPath.length;
        showImage(imgPath, currentIndex);
    });
}

/**
 * Die Anweisung sorgt dafür das beim klicken des Rückwärtsbuttons,
 * ein event gestartet wird welches mittels einer Rechenoperation
 * den Index des nächsten Bildes im ausgewählten Array ermittelt.
 * Danach wird die nächste Funktion showImage
 * welche zwei Parameter enrhält aufgerufen.
 * @param {*enthält den neu errechenten Index im ausgewählten Array} currentIndex
 * @param {*enthält die Variable in dem das ausgewählte Array geschrieben wurde} imgPath
 */
if (nextButton) {
    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % imgPath.length;
        showImage(imgPath, currentIndex);
    });
}

/**
 *In dieser Funktion werden alle Bilder mit der Klasse .clickable-image selektiert und
 *eine forEach-Schleife zum iterieren über die Bilder erstellt.
 *In der Schleife wird ein Eventlistener auf die zu klickenden Bilder verwendet,
 *um das Standard Verhalten des Browsers beim anklicken eines Bildes/Images zu verhindern.
 *Danach wird die clickedImage Funktion aufgerufen
 *@param {*steht für jedes einzelne Bild mit der Klasse .clickable-image das ausgewählt wurde} image
 *@param {*dieser Parameter steht für das Klickevent} e
 */
function iterateOverClickableImages() {
    const clickableImages = document.querySelectorAll('.clickable-image');

    clickableImages.forEach(function (image) {
        image.addEventListener('click', function (e) {
            e.preventDefault();

            clickedImage(e);
        });
    });
}

/**
 * Diese Funktion bekommt das Klickevent übergeben, speichert das target
 * (das geklickte Bild) in einer Konstanten und
 * holt sich in einer weiteren Konstanten die ID des Bildes.
 * Die ID wird über einen Parameter an die nächste Funktion übergeben.
 * @param {*beinhaltet das Klickevent (Info`s über geklickten Content)} event
 */
function clickedImage(event) {
    const imageClicked = event.target;
    const imageId = imageClicked.id;
    idToValidArrNameAndIndex(imageId);
}

/**
 * Diese Funktion bekommt die ID (Arrayname & Index) als Parameter übergeben,
 * der mittels der split-Methode in Arrayname und Index aufgeteilt wird
 * und in einer Konstanten gehalten wird.
 * In einer Else-If-Anweisung wird der Arrayname abgeglichen und
 * bei übereinstimmung wird mit der dotnotation,
 * das jeweilige Array, in einer vorher instanziierten Variablen gespeichert.
 * Das Array wird nun in einer Globalen-Variablen gespeichert,
 * in einer weiteren Konstanten wird nun der Index mit der Number-Funktion
 * von einem string in ein Number Umgewandelt, in einer Globalen Variablen gespeichert
 * und die nächste Funktion mit dem geklickten Array als Parameter wird aufgerufen.
 * @param {*beinhaltet die ID des geklickten Bildes} galleryImgIdString
 */
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

    const saveImgIndex = Number(splitId[1]);
    currentIndex = saveImgIndex;

    showGallery(validArrName);
}

/**
 * Mit diesem Eventlistener wir abgewartet bis das DOM vollständig geladen wurde,
 * erst dann wird die erste Funktion gestartet.
 */
document.addEventListener('DOMContentLoaded', function () {
    iterateOverClickableImages();
});
