export default class ScrollBackground {
    constructor() {
        this.backgroundImage = document.getElementById('background-image');
    }
    
    // Funktion für die Scrollanimation des Hintergrundes.
    // Errechnet anhand des Scrollevents wohin sich der Background bewegen soll.
    // Für das responsive Verhalten wurden hier die einzelnen Fenstergrößen mit anderen Pixelwerten berechnet. 
    start(event) {
        if (this.backgroundImage) {
            let deltaY = 0;

            if (event.type === 'wheel'){ 
                deltaY = event.deltaY;
                this.startPositionChange(deltaY);
            } else if (event.type === 'touchstart'){
                let touchStart = 0;
                touchStart = event.touches[0].clientY;

                document.addEventListener('touchmove', (e) => {
                    let touchEnd = e.touches[0].clientY;
                    let scrollDirection = touchStart - touchEnd;
                    deltaY = scrollDirection;
                    this.startPositionChange(deltaY);
                })
            }        
        }
    }

    startPositionChange(scrollPos){
        let deltaY = scrollPos;
        const screenWidth = window.innerWidth;

        if (screenWidth > 1100) {
            this.backgroundImage.style.backgroundPosition =
                deltaY > 0 ? 'center -550px' : 'center 0';
        } else if (screenWidth > 790) {
            this.backgroundImage.style.backgroundPosition =
                deltaY > 0 ? 'center -400px' : 'center 0';
        } else if (screenWidth > 480) {
            this.backgroundImage.style.backgroundPosition =
                deltaY > 0 ? 'center -250px' : 'center 150px';
        } else if (screenWidth > 320){
            this.backgroundImage.style.backgroundPosition =
                deltaY > 0 ? 'center -150px' : 'center 250px';
        }
    }
}
