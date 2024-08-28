import PictureGallery from './PicGallery.js';

export default class GalleryView {
    constructor() {
        this.pictureArrays = new PictureGallery();
 

        this.galleryViewContainer = document.querySelector(
            '.gallery-view-container',
        );
        this.closeButton = document.querySelector('.close-button');
        this.prevButton = document.querySelector('.prev-button');
        this.nextButton = document.querySelector('.next-button');
        this.closePrevNextGallery();

        this.currentIndex = 0;
        this.imgName;
        this.dirPath;
    }



    showImage(arrName, index) {
        const compPicPath = this.dirPath + arrName[index]
        const viewImage = document.querySelector('.image-view-container img');
        viewImage.src = compPicPath;
    }


    showGallery(idToArrName) {
        this.galleryViewContainer.style.display = 'flex';
        this.showImage(idToArrName, this.currentIndex);
    }


    closePrevNextGallery() {

        if (this.closeButton && this.prevButton && this.nextButton) {
            this.closeButton.addEventListener('click', () => {
                this.galleryViewContainer.style.display = 'none';
            });

            this.prevButton.addEventListener('click', () => {
                this.currentIndex =
                    (this.currentIndex - 1 + this.imgName.length) %
                    this.imgName.length;
                this.showImage(this.imgName, this.currentIndex);
            });

            this.nextButton.addEventListener('click', () => {
                this.currentIndex =
                    (this.currentIndex + 1) % this.imgName.length;
                this.showImage(this.imgName, this.currentIndex);
            });
        }
    }

    iterateOverClickableImages() {
        const clickableImages = document.querySelectorAll('.clickable-image');

        clickableImages.forEach((image) => {
            image.addEventListener('click', (e) => {
                e.preventDefault();
                this.clickedImage(e);
            });
        });
    }

    clickedImage(event) {
        const imageClicked = event.target;
        const imageId = imageClicked.id;
        this.idToValidArrNameAndIndex(imageId);
    }


    idToValidArrNameAndIndex(galleryImgIdString) {
        const splitId = galleryImgIdString.split('-');
        const unvalidArrName = splitId[0];

        let validArrName;

        switch (unvalidArrName){
            case 'specialPicArray':
                validArrName = this.pictureArrays.picObject.specialPicArray;
                this.dirPath = this.pictureArrays.specialPicPath;
                break;
            case 'weddingPicArray':
                validArrName = this.pictureArrays.picObject.weddingPicArray;
                this.dirPath = this.pictureArrays.weddingPicPath;
                break;
            case 'eventsPicArray':
                validArrName = this.pictureArrays.picObject.eventsPicArray;
                this.dirPath = this.pictureArrays.eventsPicPath;
                break;
            case 'shootingPicArray':
                validArrName = this.pictureArrays.picObject.shootingPicArray;
                this.dirPath = this.pictureArrays.shootingPicPath;
                break;
        }
        
        this.imgName = validArrName;
        const saveImgIndex = Number(splitId[1]);
        this.currentIndex = saveImgIndex;
        this.showGallery(validArrName);
    }
}
