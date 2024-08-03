export default class FormData {
    
    constructor() {
        this.form = document.querySelector('#form');
        this.userEntries = [];
        this.userSelections = [];
        
        /**
         * Werte aus dem Localstorage holen und umwandeln in ein Array.
         * Leeren des Localstorage 'performance selection' damit dieser nicht Überlastet wird.
         */
        this.savedInquiry =
            JSON.parse(localStorage.getItem('saveInquiry')) || [];
        
        this.savedPerformanceSelection = 
            JSON.parse(localStorage.getItem('savePerformanceSelection')) || [];

            localStorage.removeItem('savePerformanceSelection');
            console.log(this.savedPerformanceSelection);

        this.validEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        this.userInputSend = document.querySelector(
            '.sended-user-input-container',
        );

        this.userInputSendContent = document.querySelector('.sended-user-input');
        
        /**
         * Stellt sicher das dass Formular vorhanden ist und hält die 
         * Werte für das Fenster beim erfolglosen oder erfolgreichen abschicken des Formulars.
         */
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

    /**
     * Holt sich die vorhandenen Werte aus dem Localstorage.
     * Prüft ob Form vorhanden ist.
     * Der Eventlistener wird gesetzt und beim absenden des Form 
     * werden die Werte der einzelnen Inputs geholt und in einem Objekt gehalten.
     */
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
                
                this.checkEntriesValid(saveEntries, this.savedInquiry);
            });
        }

        //Wird am Schluss nicht mehr benötigt
        setInterval(() => {
            console.log(this.userEntries);
        }, 10000);
    }

    /**
     * Email wird validiert und Form auf Existenz geprüft.
     * Das Objekt wird in userEntries-Array gepusht und das 
     * Formular zurückgesetzt.
     * @param {object} checkEntries enthält die Einträge aus den Input's
     * @param {array} checkInquiry Werte aus dem localstorage die im Array gehalten werden
     */
    checkEntriesValid(checkEntries, checkInquiry) {
        if (checkEntries.email.match(this.validEmail) && this.form) {
            this.userEntries.push(checkEntries);
            this.form.reset();
            this.saveUserEntries(checkEntries, checkInquiry);
        } else {
            this.buildUnsuccessfullSendWindowContent();
        }
    }

    /**
     * Die Nutzereinträge werden im Localstorage gehalten.
     * Das userEnries-Array wird gelöscht 
     * und mit den neuen Werten aus dem Storage Überschrieben.
     * Localstorage für die Einträge wird gelöscht.
     * @param {object} saveEntries enthält die Einträge aus den Input's
     * @param {array} inquiry Werte aus dem localstorage die im Array gehalten werden
     */
    saveUserEntries(saveEntries, inquiry) {
        localStorage.setItem('saveInquiry', JSON.stringify(saveEntries));
        this.userEntries = [];
        this.userEntries.push(inquiry);
        localStorage.removeItem('saveInquiry');
        this.getSavedPerformanceSelection()
    }
    
    /**
     * Ein neues Objekt für die PerformanceSelection wird erstellt 
     * und auf die Übergebene Selection wird iteriert.
     * Hier werden die Werte und der Index als Parameter gehalten, 
     * als Schlüssel-Werte paare im erstellten Objekt eingefügt
     * und im Einträge-Array hinzugefügt.
     */
    getSavedPerformanceSelection(){
        let performanceSelection  = {}
        
        this.savedPerformanceSelection.forEach((e, i) => {
            let selectionKey = 'selection' + i;
            performanceSelection[selectionKey] = e;
        });
        
        this.userEntries[0].push(performanceSelection);
        this.buildSuccessfullSendWindowContent();
    }

    /**
     * Bei erfolgreichem absenden (oder nicht erfolgreich) 
     * wird hier der entsprechende Text und die Farbe gesetzt.
     */
    buildSuccessfullSendWindowContent() {
        this.headlineInputSend.textContent = 'Erfolgreich abgesendet!';
        this.paragraphInputSend.textContent = `Vielen Dank für ihr Vertrauen. Wir haben Ihre Anfrage
        erhalten und werden uns schnellst möglich darum kümmern.`;
        this.headlineInputSend.style.color = this.colorSuccess;
        this.paragraphInputSend.style.color = this.colorSuccess;
        this.openUserInputSendWindow();
    }

    buildUnsuccessfullSendWindowContent() {
        this.headlineInputSend.textContent =
            'Upps, da ist was schief gelaufen. Versuchen sie es noch einmal!';
        this.paragraphInputSend.textContent = `Die von Ihnen eingegebene Email Adresse entspricht nicht dem gängigen Format für Email Adressen`;
        this.headlineInputSend.style.color = this.colorAlert;
        this.paragraphInputSend.style.color = this.colorAlert;
        this.openUserInputSendWindow();
    }

    /**
     * Fenster für den Statusbericht des Form wird sichtbar gemacht.
     */
    openUserInputSendWindow() {
        this.userInputSend.style.display = 'flex';
        this.closeUserInputSendWindow();
    }

    /**
     * Fenster wird wieder durch Button-Klick wieder geschloßen.
     */
    closeUserInputSendWindow() {
        this.userInputSendBtn.addEventListener('click', () => {
            this.userInputSend.style.display = 'none';
        });
    }
}
