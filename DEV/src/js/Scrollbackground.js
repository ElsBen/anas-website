export default class ScrollBackground {
    constructor() {
        this.backgroundImage = document.getElementById('background-image');
    }
    
    // Funktion für die Scrollanimation des Hintergrundes.
    // Errechnet anhand des Scrollevents wohin sich der Background bewegen soll.
    // Für das responsive Verhalten wurden hier die einzelnen Fenstergrößen mit anderen Pixelwerten berechnet. 
    start(event) {
        if (this.backgroundImage) {

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
            }
        }
    }
}
