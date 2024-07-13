import PerformanceSideData from './PerformanceSideData.js';

export default class Formdata {
    
    constructor() {
        this.form = document.querySelector('#form');
        this.userEntries = [];
        this.userSelections = [];
        console.log(this.userSelections);
        

        this.savedInquiry =
            JSON.parse(localStorage.getItem('saveInquiry')) || [];

        this.validEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        this.userInputSend = document.querySelector(
            '.sended-user-input-container',
        );

        this.userInputSendContent = document.querySelector('.sended-user-input');
        

        if (this.form){

            this.headlineInputSend = this.userInputSendContent.querySelector('h2');
            this.paragraphInputSend = this.userInputSendContent.querySelector('p');
    
            this.colorAlert = '#ff7f50';
            this.colorSuccess = '#b4ffd8';
    
            this.userInputSendBtn = document.querySelector(
                '.user-input-sended-btn'
            );
        } else {console.log('Formular nicht vorhanden')}
       
    }

    start() {
        if (this.savedInquiry && this.savedInquiry.length >= 0) {
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
        console.log(inquiry);
        localStorage.removeItem('saveInquiry');
        console.log(this.userEntries);
        this.buildSuccessfulSendWindowContent();
    }

    buildSuccessfulSendWindowContent() {
        this.headlineInputSend.textContent = 'Erfolgreich abgesendet!';
        this.paragraphInputSend.textContent = `Vielen Dank für ihr Vertrauen. Wir haben Ihre Anfrage
        erhalten und werden uns schnellst möglich darum kümmern.`;

        this.openUserInputSendWindow();
    }

    buildUnsuccessfulSendWindowContent() {
        this.headlineInputSend.textContent =
            'Upps, da ist was schief gelaufen!';
        this.paragraphInputSend.textContent = `Die von Ihnen eingegebene Email Adresse entspricht nicht dem gängigen Format für Email Adressen`;
        this.headlineInputSend.style.color = this.colorAlert;
        this.paragraphInputSend.style.color = this.colorAlert;
        this.openUserInputSendWindow();
    }

    openUserInputSendWindow() {
        this.userInputSend.style.display = 'flex';
        this.closeUserInputSendWindow();
    }

    closeUserInputSendWindow() {
        this.userInputSendBtn.addEventListener('click', () => {
            this.headlineInputSend.style.color = this.colorSuccess;
            this.paragraphInputSend.style.color = this.colorSuccess;
            this.userInputSend.style.display = 'none';
        });
    }
}
