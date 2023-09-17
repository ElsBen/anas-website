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

// Diesen teil auf das neue klassen system updaten!!!

/*
### Entweder verschiedene Arrays erstellen oder mit einer Schleife und einer Funktion Automatisch erstellen
und mit den Dateipfaden füllen lassen ###
*/

let imagesArray = [
    './src/img/galerie-bibliothek/besonderes/particularly001.jpg',
    './src/img/galerie-bibliothek/besonderes/particularly002.jpg',
    './src/img/galerie-bibliothek/besonderes/particularly003.jpg',
    './src/img/galerie-bibliothek/besonderes/particularly004.jpg',
    './src/img/galerie-bibliothek/besonderes/particularly005.jpg',
    './src/img/galerie-bibliothek/besonderes/particularly006.jpg',
    './src/img/galerie-bibliothek/besonderes/particularly007.jpg',
    './src/img/galerie-bibliothek/besonderes/particularly008.jpg',
    './src/img/galerie-bibliothek/besonderes/particularly009.jpg',
];

// Arrays für die Zukünftige Logik

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

// Referenzieren und Erstellen des HTML-Gerüstes
let checkGalerieSide = document.querySelector('#galerie-bereich');

function htmlContentCheck() {
    if (checkGalerieSide) {
        iteratePicObject();
    }
}

function iteratePicObject() {
    const eigenschaften = Object.keys(bilderObjekt);

    for (const eigenschaft of eigenschaften) {
        const arrKey = eigenschaft;
        procesArrKeyInHtmlCompatContent(arrKey);
    }
}

function procesArrKeyInHtmlCompatContent(arrId) {
    // hier nochmal prüfen es scheint etwas mit dem ausgabewert nicht zu stimmen
    let imgIdString = '';

    if (arrId === 'specialPicArray') {
        imgIdString = 'special-galerie';
    } else if (arrId === 'weddingPicArray') {
        imgIdString = 'wedding-galerie';
    } else if (arrId === 'eventsPicArray') {
        imgIdString = 'event-galerie';
    } else if (arrId === 'shootingPicArray') {
        imgIdString = 'shooting-galerie';
    }

    buildHtmlContent(imgIdString);
    insertImages(arrId, imgIdString);
}

function buildHtmlContent(imgIdString) {
    let picArea = document.getElementById('galerie-bereich');

    let imgContainer = document.createElement('div');
    imgContainer.setAttribute('id', imgIdString);
    console.log(imgContainer);
    let headLine = document.createElement('h1');
    headLine.textContent = imgIdString;

    imgContainer.insertAdjacentElement('afterbegin', headLine);
    picArea.appendChild(imgContainer);
    console.log(picArea);
}

// Funktion zum einbinden der <a> und <img> -Tags in das HTML Gerüstes
function insertImages(arrProp, conId) {
    /**
     * Wichtig!!! insertImages funktion braucht 2 Parameter 1x für const container und für das imgArray
     * Die if Anweisung benötigt eine funktione drumherum
     * Eine Logik für das einfügen der einzelnen Reiter wird auch noch benötigt
     */

    const container = document.getElementById(conId);
    console.log(container);
    for (let i = 0; i < bilderObjekt[arrProp].length; i++) {
        const imageSrc = bilderObjekt[arrProp][i];

        const anchorElement = document.createElement('a');
        anchorElement.href = imageSrc;

        const imageElement = document.createElement('img');
        imageElement.src = imageSrc;

        anchorElement.appendChild(imageElement);
        console.log(container);
        container.appendChild(anchorElement);
    }
}

htmlContentCheck();
