import PerformanceSideData from './PerformanceSideData.js';

export default class Formdata {
    constructor() {
        this.form = document.querySelector('#form');
        this.userEntries = [];
        this.savedInquiry = JSON.parse(localStorage.getItem('saveInquiry'));
        this.performanceSideSelections = PerformanceSideData;
        console.log(this.performanceSideSelections);
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

                this.userEntries.push(saveEntries);
                this.form.reset();
                this.saveUserEntries(saveEntries, this.savedInquiry);
            });
        }

        //Wird am Schluss nicht mehr benötigt
        setInterval(() => {
            console.log(this.userEntries);
        }, 10000);
    }

    saveUserEntries(entries, inquiry) {
        localStorage.setItem('saveInquiry', JSON.stringify(entries));

        this.userEntries = [];
        this.userEntries.push(inquiry);

        // localStorage.removeItem('saveInquiry');
    }
}
// Hier sollte noch ein Feedback implementiert werden, welches bei Erfolgreichen absenden des Formulares
// dem Nutzer anzeigt das die Anfrage erfolgreich abgesendet wurde.
