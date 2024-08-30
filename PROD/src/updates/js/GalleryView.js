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
            case 'galOnePicArray':
                validArrName = this.pictureArrays.picObject.galOnePicArray;
                this.dirPath = this.pictureArrays.galOnePicPath;
                break;
            case 'galTwoPicArray':
                validArrName = this.pictureArrays.picObject.galTwoPicArray;
                this.dirPath = this.pictureArrays.galTwoPicPath;
                break;
            case 'galThreePicArray':
                validArrName = this.pictureArrays.picObject.galThreePicArray;
                this.dirPath = this.pictureArrays.galThreePicPath;
                break;
            case 'galFourPicArray':
                validArrName = this.pictureArrays.picObject.galFourPicArray;
                this.dirPath = this.pictureArrays.galFourPicPath;
                break;
        }
        
        this.imgName = validArrName;
        const saveImgIndex = Number(splitId[1]);
        this.currentIndex = saveImgIndex;
        this.showGallery(validArrName);
    }
}
