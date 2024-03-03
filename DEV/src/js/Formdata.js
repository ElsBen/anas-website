// import PerformanceSideData from './PerformanceSideData.js';

export default class Formdata {
    constructor() {
        this.form = document.querySelector('#form');
        this.userEntries = [];

        this.savedInquiry =
            JSON.parse(localStorage.getItem('saveInquiry')) || [];

        // this.performanceSideSelections = PerformanceSideData; SORGT ANSCHEINEND FÜR EINEN FEHLER !!!!!
        // UM DATEN ZU ÜBERMITTELN COOKIES ODER LOCALSTORAGE VERWENDEN!!!!

        this.validEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        this.userInputSend = document.querySelector(
            '.sended-user-input-container',
        );

        this.userInputSendBtn = document.querySelector(
            '.user-input-sended-btn',
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

                this.checkEntriesValid(saveEntries, this.savedInquiry);
            });
        }

        //Wird am Schluss nicht mehr benötigt
        setInterval(() => {
            console.log(this.userEntries);
        }, 10000);
    }

    checkEntriesValid(checkEntries, checkInquiry) {
        if (checkEntries.email.match(this.validEmail) && this.form) {
            this.userEntries.push(checkEntries);
            this.form.reset();
            this.saveUserEntries(checkEntries, checkInquiry);
        } else {
            this.buildUnsuccessfulSendWindowContent();
        }
    }

    saveUserEntries(saveEntries, inquiry) {
        localStorage.setItem('saveInquiry', JSON.stringify(saveEntries));

        this.userEntries = [];
        this.userEntries.push(inquiry);
        localStorage.removeItem('saveInquiry');
        this.buildSuccessfulSendWindowContent();
    }

    buildSuccessfulSendWindowContent() {
        this.openUserInputSendWindow();
    }

    buildUnsuccessfulSendWindowContent() {}

    openUserInputSendWindow() {
        this.userInputSend.style.display = 'flex';
        this.closeUserInputSendWindow();
    }

    closeUserInputSendWindow() {
        this.userInputSendBtn.addEventListener('click', () => {
            this.userInputSend.style.display = 'none';
        });
    }
}
