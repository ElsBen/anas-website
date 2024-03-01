import PerformanceSideData from './PerformanceSideData.js';

export default class Formdata {
    constructor() {
        this.form = document.querySelector('#form');
        this.userEntries = [];
        this.savedInquiry = JSON.parse(localStorage.getItem('saveInquiry'));
        this.performanceSideSelections = PerformanceSideData;
        console.log(this.performanceSideSelections);
        this.successfullSend = document.querySelector(
            '.sended-successfull-container',
        );
        this.successfullSendBtn = document.querySelector(
            '.successfull-send-btn',
        );
    }

    start() {
        if (this.savedInquiry && this.savedInquiry.length > 0) {
            this.userEntries = this.savedInquiry;
        }

        if (this.form) {
            this.form.addEventListener('submit', (e) => {
                e.preventDefault();

                const formName = document.querySelector('#name').value;
                const formLastName = document.querySelector('#last-name').value;
                const formEMail = document.querySelector('#email').value;
                const formTelNumber =
                    document.querySelector('#tele-number').value;
                const formMessage = document.querySelector('#message').value;

                const saveEntries = {
                    name: formName,
                    lastName: formLastName,
                    email: formEMail,
                    telephone: formTelNumber,
                    message: formMessage,
                };

                // Hier die Logik für den Abruf selektierter Pakete Implementieren!
                console.log(this.performanceSideSelections);

                this.checkEntriesValid();
            });
        }

        //Wird am Schluss nicht mehr benötigt
        setInterval(() => {
            console.log(this.userEntries);
        }, 10000);
    }

    checkEntriesValid() {
        // this.validEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        // if (this.start.saveEntries.email = ){}
        // console.log(this.start.saveEntries.email);
        this.userEntries.push(this.start.saveEntries);
        this.form.reset();
        this.saveUserEntries(this.start.saveEntries, this.savedInquiry);
    }

    saveUserEntries(entries, inquiry) {
        localStorage.setItem('saveInquiry', JSON.stringify(entries));

        this.userEntries = [];
        this.userEntries.push(inquiry);
        this.openSuccessfullSendWindow();
        // localStorage.removeItem('saveInquiry');
    }

    openSuccessfullSendWindow() {
        this.successfullSend.style.display = 'flex';
        this.closeSuccessfullSendWindow();
    }

    closeSuccessfullSendWindow() {
        this.successfullSendBtn.addEventListener('click', () => {
            this.successfullSend.style.display = 'none';
        });
    }
}
// Probleme beim Localstorage Wenn dieser anscheinend voll ist,
// sorgt das dafür das im Browser eine Fehlermeldung entsteht und
// die Webseite nicht meht ordnungsgemäß funktioniert!!!!
