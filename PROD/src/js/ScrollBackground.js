export default class ScrollBackground{constructor(){this.backgroundImage=document.getElementById("background-image")}start(t){if(this.backgroundImage){let e=0;if("wheel"===t.type)e=t.deltaY,this.startPositionChange(e);else if("touchstart"===t.type){let n=0;n=t.touches[0].clientY,document.addEventListener("touchmove",t=>{let o=t.touches[0].clientY,c=n-o;e=c,this.startPositionChange(e)})}}}startPositionChange(t){let e=t;const n=window.innerWidth;n>1100?this.backgroundImage.style.backgroundPosition=e>0?"center -650px":"center 0":n>790?this.backgroundImage.style.backgroundPosition=e>0?"center -400px":"center 0":n>480?this.backgroundImage.style.backgroundPosition=e>0?"center -250px":"center 150px":n>320&&(this.backgroundImage.style.backgroundPosition=e>0?"center -150px":"center 250px")}}