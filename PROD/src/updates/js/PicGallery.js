export default class PictureGallery {
    constructor() {

        this.specialPicPath = './src/img/galerie-bibliothek/besonderes/';
        this.weddingPicPath = './src/img/galerie-bibliothek/hochzeiten/';
        this.eventsPicPath = './src/img/galerie-bibliothek/events/';
        this.shootingPicPath = './src/img/galerie-bibliothek/shootings/';

        this.forThumbnails = 'thumbnails/';

    
        this.picObject = {
            specialPicArray: [
                "special001.avif",
                "special002.avif",
                "special003.avif",
                "special004.avif",
                "special005.avif",
                "special006.avif",
                "special007.avif",
                "special008.avif",
                "special009.avif",
            ],

            weddingPicArray: [
                "wedding001.avif",
                "wedding002.avif",
                "wedding003.avif",
                "wedding004.avif",
                "wedding005.avif",
                "wedding006.avif",
                "wedding007.avif",
                "wedding008.avif",
                "wedding009.avif",
            ],

            eventsPicArray: [
                "event001.avif",
                "event002.avif",
                "event003.avif",
                "event004.avif",
                "event005.avif",
                "event006.avif",
                "event007.avif",
                "event008.avif",
                "event009.avif",
            ],

            shootingPicArray: [
                "shooting001.avif",
                "shooting002.avif",
                "shooting003.avif",
                "shooting004.avif",
                "shooting005.avif",
                "shooting006.avif",
                "shooting007.avif",
                "shooting008.avif",
                "shooting009.avif",
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
            case 'specialPicArray':
                imgIdString = 'special-galerie';
                imgAltContent = 'Bild in der besondere Fotogalerie'
                headLineContent = 'Besondere Fotogalerie';
                picPath = this.specialPicPath;
                break;
            case 'weddingPicArray':
                imgIdString = 'wedding-galerie';
                imgAltContent = 'Bild in der Hochzeit`s Fotogalerie'
                headLineContent = 'Hochzeits Galerie';
                picPath = this.weddingPicPath;
                break;
            case 'eventsPicArray':
                imgIdString = 'event-galerie';
                imgAltContent = 'Bild in der Event Fotogalerie'
                headLineContent = 'Event Galerie';
                picPath = this.eventsPicPath;
                break;
            case 'shootingPicArray':
                imgIdString = 'shooting-galerie';
                imgAltContent = 'Bild in der Shooting Fotogalerie'
                headLineContent = 'Fotoshooting Galerie';
                picPath = this.shootingPicPath;
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
