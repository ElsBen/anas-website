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

let imagesArray = [
    './src/img/pic-bibliothek/bild001.jpg',
    './src/img/pic-bibliothek/bild002.jpg',
    './src/img/pic-bibliothek/bild003.jpg',
    './src/img/pic-bibliothek/bild004.jpg',
    './src/img/pic-bibliothek/bild005.jpg',
    './src/img/pic-bibliothek/bild006.jpg',
    './src/img/pic-bibliothek/bild007.jpg',
    './src/img/pic-bibliothek/bild008.jpg',
    './src/img/pic-bibliothek/bild009.jpg',
];

// Referenzieren und Erstellen des HTML-Gerüstes
let checkGalerieSide = document.querySelector('#galerie-bereich');

// Funktion zum einbinden der <a> und <img> -Tags in das HTML Gerüstes
function insertImages() {
    const container = document.getElementById('img-container');

    // Über das Array von Bildern iterieren
    for (let i = 0; i < imagesArray.length; i++) {
        const imageSrc = imagesArray[i];

        const anchorElement = document.createElement('a');
        anchorElement.href = imageSrc;

        const imageElement = document.createElement('img');
        imageElement.src = imageSrc;

        anchorElement.appendChild(imageElement);
        container.appendChild(anchorElement);
    }
}

if (checkGalerieSide) {
    let picArea = document.getElementById('galerie-bereich');

    let imgContainer = document.createElement('div');
    imgContainer.setAttribute('id', 'img-container');
    picArea.appendChild(imgContainer);
    insertImages();
}
