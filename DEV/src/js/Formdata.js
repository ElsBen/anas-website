export default class Formdata {
    constructor() {
        this.form = document.querySelector('#form');
        this.userEntries = [];
    }

    start() {
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

                this.userEntries.push(saveEntries);
                this.form.reset();
            });
        }
        //Wird am Schluss nicht mehr benötigt
        setInterval(() => {
            console.log(this.userEntries);
        }, 10000);
    }
}
