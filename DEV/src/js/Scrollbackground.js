export default class ScrollBackground {
    constructor() {
        this.backgroundImage = document.getElementById('background-image');
    }
    
    // Filtert das ausgelöste Event (wheel / touch).
    // Damit startPositionChange() für beide Events verwendet werden kann.
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

    // Funktion für die Scrollanimation des Hintergrundes.
    // Errechnet anhand des Scrollevents wohin sich der Background bewegen soll.
    // Für das responsive Verhalten wurden hier die einzelnen Fenstergrößen mit anderen Pixelwerten berechnet. 
    startPositionChange(scrollPos){
        let deltaY = scrollPos;
        const screenWidth = window.innerWidth;
        
        if (screenWidth > 1100) {
            this.backgroundImage.style.backgroundPosition =
                deltaY > 0 ? 'center -250px' : 'center 250px';
        } else if (screenWidth < 650) {
            this.backgroundImage.style.backgroundPosition =
                deltaY > 0 ? 'center -100px' : 'center 450px';
        }

    }
}
