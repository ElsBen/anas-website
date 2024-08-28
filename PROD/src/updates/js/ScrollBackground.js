export default class ScrollBackground {
    constructor() {
        this.backgroundImage = document.getElementById('background-image');
        this.lastDeltaY = 0;
    }
   
    start(event, run) {
        if (this.backgroundImage) {
            let deltaY = 0;

            if (event.type === 'wheel'){ 
                deltaY = event.deltaY;
                this.startPositionChange(deltaY);
            } else if (event.type === 'touchstart'){
                
                let touchStart = event.touches[0].clientY;

                const onTouchMove = (e)=>{
                    run = true;
                    let touchEnd = e.touches[0].clientY;
                    let scrollDirection = touchStart - touchEnd;
                    deltaY = this.lastDeltaY + scrollDirection;
                    this.lastDeltaY = deltaY;
                }

                document.addEventListener('touchmove', onTouchMove);
                document.addEventListener('touchend', ()=>{
                    this.startPositionChange(deltaY, run);
                });
            }        
        }
    }

    startPositionChange(scrollPos, run){
        let deltaY = scrollPos;
        const screenWidth = window.innerWidth;
        
        if (screenWidth > 1100) {
            this.backgroundImage.style.backgroundPosition =
                deltaY > 0 ? 'center -250px' : 'center 270px';
        } else if (screenWidth < 1100) {
            this.backgroundImage.style.backgroundPosition =
                deltaY > 0 ? 'center -50px' : 'center 450px';
        }

        run = false;
    }
}
