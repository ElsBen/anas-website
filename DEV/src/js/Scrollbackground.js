export default class Scrollanimation {
    constructor() {
        this.backgroundImage = document.getElementById('background-image');
    }
    // hier die Funktion für die Klasse umwandeln
    start(event) {
        if (!this.backgroundImage) {
            console.log('Hintergrundbild nicht vorhanden!!!');
            return;
        }

        const deltaY = event.deltaY;
        const screenWidth = window.innerWidth;

        if (screenWidth > 1100) {
            this.backgroundImage.style.backgroundPosition =
                deltaY > 0 ? '0 -550px' : '0 0';
        } else if (screenWidth > 790) {
            this.backgroundImage.style.backgroundPosition =
                deltaY > 0 ? '0 -400px' : '0 0';
        } else if (screenWidth > 480) {
            this.backgroundImage.style.backgroundPosition =
                deltaY > 0 ? '0 -250px' : '0 150px';
        } else {
            // Für Bildschirmbreiten unter 480px, passen Sie die Behandlung nach Bedarf an.
            // z.B. backgroundImage.style.backgroundPosition = deltaY > 0 ? '-40px 0' : '0 0';
        }

        // ALTLAST KANN WENN NICHT BENÖTIGT GELÖSCHT WERDEN

        // NACH AUSGIEBIGEN TESTS KANN DER UNTEN STEHENDE CODE GELÖSCHT WERDEN!!!!!

        // document.addEventListener('wheel', function (e) {
        //     if (e.deltaY > 0 && window.screen.width > 1100) {
        //         backgroundImage.setAttribute('style', 'background-position: 0 -550px');
        //     } else if (e.deltaY < 0 && window.screen.width > 1100) {
        //         backgroundImage.setAttribute('style', 'background-position: 0 0');
        //     } else if (
        //         e.deltaY > 0 &&
        //         window.screen.width < 1100 &&
        //         window.screen.width > 790
        //     ) {
        //         backgroundImage.setAttribute('style', 'background-position: 0 -400px');
        //     } else if (
        //         e.deltaY < 0 &&
        //         window.screen.width < 1100 &&
        //         window.screen.width > 790
        //     ) {
        //         backgroundImage.setAttribute('style', 'background-position: 0 0');
        //     } else if (
        //         e.deltaY > 0 &&
        //         window.screen.width < 790 &&
        //         window.screen.width > 480
        //     ) {
        //         backgroundImage.setAttribute('style', 'background-position: 0 -250px');
        //     } else if (
        //         e.deltaY < 0 &&
        //         window.screen.width < 790 &&
        //         window.screen.width > 480
        //     ) {
        //         backgroundImage.setAttribute('style', 'background-position: 0 150px');
        //     } else if (e.deltaY > 0 && window.screen.width < 480) {
        //         backgroundImage.setAttribute('style', 'background-position: -40px 0');
        //         // bei 480px lässt sich das image nicht mehr abhängig von der viewportgröße skalieren
        //         // backgroundImage.setAttribute('style', 'width: 70%');

        //         // Beim Seitenwechsel unter 480px kommt es zum seitlichem verrücken des Background-images.
        //         // Den letzten Schritt unter 480px überprüfen und ggf.
        //         // mittels CSS und "Display: none" Background-image abschalten,
        //         // um dann ein anderes angepasstes Background-image einzufügen,
        //         // Welches dann mit "display: cover" wieder der Fenstergröße entsprechend angepasst werden kann.
        //     } else if (backgroundImage === undefined || null) {
        //         console.log('Hintergrundbild nicht vorhanden!!!');
        //     }
        // });
    }
}
