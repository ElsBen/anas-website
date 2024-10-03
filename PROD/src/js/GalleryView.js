import PictureGallery from"./PicGallery.js";export default class GalleryView{constructor(){this.pictureArrays=new PictureGallery,this.galleryViewContainer=document.querySelector(".gallery-view-container"),this.closeButton=document.querySelector(".close-button"),this.prevButton=document.querySelector(".prev-button"),this.nextButton=document.querySelector(".next-button"),this.closePrevNextGallery(),this.currentIndex=0,this.imgName,this.dirPath}showImage(e,t){const r=this.dirPath+e[t],i=document.querySelector(".image-view-container img");i.src=r}showGallery(e){this.galleryViewContainer.style.display="flex",this.showImage(e,this.currentIndex)}closePrevNextGallery(){this.closeButton&&this.prevButton&&this.nextButton&&(this.closeButton.addEventListener("click",()=>{this.galleryViewContainer.style.display="none"}),this.prevButton.addEventListener("click",()=>{this.currentIndex=(this.currentIndex-1+this.imgName.length)%this.imgName.length,this.showImage(this.imgName,this.currentIndex)}),this.nextButton.addEventListener("click",()=>{this.currentIndex=(this.currentIndex+1)%this.imgName.length,this.showImage(this.imgName,this.currentIndex)}))}iterateOverClickableImages(){const e=document.querySelectorAll(".clickable-image");e.forEach(e=>{e.addEventListener("click",e=>{e.preventDefault(),this.clickedImage(e)})})}clickedImage(e){const t=e.target,r=t.id;this.idToValidArrNameAndIndex(r)}idToValidArrNameAndIndex(e){const t=e.split("-"),r=t[0];let i;switch(r){case"galOnePicArray":i=this.pictureArrays.picObject.galOnePicArray,this.dirPath=this.pictureArrays.galOnePicPath;break;case"galTwoPicArray":i=this.pictureArrays.picObject.galTwoPicArray,this.dirPath=this.pictureArrays.galTwoPicPath;break;case"galThreePicArray":i=this.pictureArrays.picObject.galThreePicArray,this.dirPath=this.pictureArrays.galThreePicPath;break;case"galFourPicArray":i=this.pictureArrays.picObject.galFourPicArray,this.dirPath=this.pictureArrays.galFourPicPath}this.imgName=i;const a=Number(t[1]);this.currentIndex=a,this.showGallery(i)}}