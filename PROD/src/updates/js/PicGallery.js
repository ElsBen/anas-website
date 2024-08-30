export default class PictureGallery {
    constructor() {

        this.galOnePicPath = './src/img/galerie-bibliothek/gallery_1/';
        this.galTwoPicPath = './src/img/galerie-bibliothek/gallery_2/';
        this.galThreePicPath = './src/img/galerie-bibliothek/gallery_3/';
        this.galFourPicPath = './src/img/galerie-bibliothek/gallery_4/';

        this.forThumbnails = 'thumbnails/';

    
        this.picObject = {
            galOnePicArray: [
                "gallery_1_001.avif",
                "gallery_1_002.avif",
                "gallery_1_003.avif",
                "gallery_1_004.avif",
                "gallery_1_005.avif",
                "gallery_1_006.avif",
                "gallery_1_007.avif",
                "gallery_1_008.avif",
                "gallery_1_009.avif",
            ],

            galTwoPicArray: [
                "gallery_2_001.avif",
                "gallery_2_002.avif",
                "gallery_2_003.avif",
                "gallery_2_004.avif",
                "gallery_2_005.avif",
                "gallery_2_006.avif",
                "gallery_2_007.avif",
                "gallery_2_008.avif",
                "gallery_2_009.avif",
            ],

            galThreePicArray: [
                "gallery_3_001.avif",
                "gallery_3_002.avif",
                "gallery_3_003.avif",
                "gallery_3_004.avif",
                "gallery_3_005.avif",
                "gallery_3_006.avif",
                "gallery_3_007.avif",
                "gallery_3_008.avif",
                "gallery_3_009.avif",
            ],

            galFourPicArray: [
                "gallery_4_001.avif",
                "gallery_4_002.avif",
                "gallery_4_003.avif",
                "gallery_4_004.avif",
                "gallery_4_005.avif",
                "gallery_4_006.avif",
                "gallery_4_007.avif",
                "gallery_4_008.avif",
                "gallery_4_009.avif",
            ],
        };
        
        this.checkGalerieSide = document.querySelector('#gallery-area');
    }


    htmlContentCheck() {
        if (this.checkGalerieSide) {
            this.iteratePicObject();
        }
    }


    iteratePicObject() {
        const picObjectProps = Object.keys(this.picObject);

        for (const property of picObjectProps) {
            const objProp = property;
            this.processArrKeyInHtmlCompatContent(objProp);
        }
    }


    processArrKeyInHtmlCompatContent(arrId) {
        let imgIdString = '';
        let imgAltContent = '';
        let headLineContent = '';
        let picPath = '';

        switch (arrId) {
            case 'galOnePicArray':
                imgIdString = 'gallery-1';
                imgAltContent = 'Bild in der besondere Fotogalerie'
                headLineContent = 'Besondere Fotogalerie';
                picPath = this.galOnePicPath;
                break;
            case 'galTwoPicArray':
                imgIdString = 'gallery-2';
                imgAltContent = 'Bild in der Architektur Fotogalerie'
                headLineContent = 'Architektur Galerie';
                picPath = this.galTwoPicPath;
                break;
            case 'galThreePicArray':
                imgIdString = 'gallery-3';
                imgAltContent = 'Bild in der Event Fotogalerie'
                headLineContent = 'Event Galerie';
                picPath = this.galThreePicPath;
                break;
            case 'galFourPicArray':
                imgIdString = 'gallery-4';
                imgAltContent = 'Bild in der Shooting Fotogalerie'
                headLineContent = 'Fotoshooting Galerie';
                picPath = this.galFourPicPath;
                break;
        }
        this.buildHtmlContent(imgIdString, headLineContent);
        this.insertImages(arrId, imgIdString, picPath, imgAltContent);
    }

    buildHtmlContent(imgIdString, headLineContent) {
        let picArea = document.getElementById('gallery-area');

        let imgContainer = document.createElement('div');
        imgContainer.setAttribute('id', imgIdString);
        imgContainer.classList.add('style-img-container');

        let headLine = document.createElement('h1');
        headLine.textContent = headLineContent;

        imgContainer.insertAdjacentElement('afterbegin', headLine);
        picArea.appendChild(imgContainer);
    }


    insertImages(arrKey, conId, path, altContent) {
        const container = document.getElementById(conId);

        for (let i = 0; i < this.picObject[arrKey].length; i++) {
            const imageName = this.picObject[arrKey][i];
            const imageSrc = path + this.forThumbnails + imageName;
            

            const anchorElement = document.createElement('a');
            anchorElement.href = imageSrc;

            const imageElement = document.createElement('img');
            imageElement.setAttribute('class', 'clickable-image');
            imageElement.setAttribute(`id`, `${arrKey + `-` + i}`);
            imageElement.src = imageSrc;
            imageElement.setAttribute('alt', altContent);
            imageElement.loading = 'lazy';
            anchorElement.appendChild(imageElement);

            container.appendChild(anchorElement);
        }
    }
}
