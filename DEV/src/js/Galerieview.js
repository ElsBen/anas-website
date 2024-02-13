export default class Galerieview {
    constructor() {}
}
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
