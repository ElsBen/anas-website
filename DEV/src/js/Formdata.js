export default class FormData {
    
    constructor() {
        this.form = document.querySelector('#form');
        this.saveEntr;
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

        this.validEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        this.userInputSend = document.querySelector(
            '.sended-user-input-container',
        );

        this.userInputSendContent = document.querySelector('.sended-user-input');

        /**
         * Wird verzögert aufgerufen damit es keinen Fehler beim Laden des Form-Modules aus 
         * dem Perfomance-Modul heraus gibt. 
         * Öffnet durch Button-Klick Eingaben richtig Fenster, Eingabe falsch Fenster oder Eingabe erfolgreich Fenster.
         */
        setTimeout(()=>{
            this.userInputSendContent.addEventListener('click', (e) => {
                
                if (e.target.innerHTML.match('Ja')){
                    setTimeout(()=>{
                        this.userInputCancelBtn.style.display = 'none';
                        this.saveUserEntries(this.saveEntr);
                    }, 1000)
                } else if (e.target.innerHTML.match('Nein')){
                    this.userInputCancelBtn.style.display = 'none';
                    this.validatAndBuildSendStateWindow(false);
                } else if (e.target.innerHTML.match('Schließen')){
                    this.userInputSend.style.display = 'none';
                }
            });
        }, 2000)
        
        
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
            this.userInputCancelBtn = document.querySelector('.hide-no-btn');
        } else {console.log('Form does not exist!')}
       
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

                this.userInputCancelBtn.style.display = 'inline-block';
                this.checkEntriesValid(saveEntries);
            });
        }

        // Wird am Schluss nicht mehr benötigt
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
    checkEntriesValid(checkEntries) {

        if (checkEntries.email.match(this.validEmail) && this.form) {
            this.areTheEntriesCorrectWindow(checkEntries);          
        } else {
            this.userInputCancelBtn.style.display = 'none';
            this.validatAndBuildSendStateWindow('mail-unvalid');
        }
    }

    areTheEntriesCorrectWindow(entries){
        
        const name = `Name: ${entries.name}`;
        const lastName = `Nachname: ${entries.lastName}`;
        const email = `Email: ${entries.email}`;
        const telephone = `Telefon: ${entries.telephone}`;
        const message = `Nachricht: ${entries.message}`;
        const performanceSelection = ` Auswahl: ${JSON.stringify(this.savedPerformanceSelection).replace(/,/g, ', ')}`;
        const formattedEntries = [name, lastName, email, telephone, message, performanceSelection];
     
        this.validatAndBuildSendStateWindow(formattedEntries, entries);
    }

    /**
     * Die Nutzereinträge werden im Localstorage gehalten.
     * Das userEnries-Array wird gelöscht 
     * und mit den neuen Werten aus dem Storage Überschrieben.
     * Localstorage für die Einträge wird gelöscht.
     * @param {object} saveEntries enthält die Einträge aus den Input's
     * @param {array} inquiry Werte aus dem localstorage die im Array gehalten werden
     */
    saveUserEntries(saveEntries) {
        this.userEntries.push(saveEntries);
        localStorage.setItem('saveInquiry', JSON.stringify(saveEntries));
        this.userEntries = [];
        this.userEntries.push(this.savedInquiry);
        localStorage.removeItem('saveInquiry');
        this.form.reset();
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
        this.validatAndBuildSendStateWindow(true);
    }

    /**
     * Bei erfolgreichem absenden (oder nicht erfolgreich) 
     * wird hier der entsprechende Text und die Farbe gesetzt.
     */
    validatAndBuildSendStateWindow(state, entries){
        let headline;
        let content;
        let btnContent;
        let color;
        let arrChecked;

        if (Array.isArray(state)){
            arrChecked = state;
            state = 'Array';
        }
        
        switch(state){
            
            case true:
                headline = 'Erfolgreich abgesendet!';
                content = 'Vielen Dank für ihr Vertrauen. Wir haben Ihre Anfrage erhalten und werden uns schnellst möglich darum kümmern.';
                btnContent = 'Schließen';
                color = this.colorSuccess;
                this.buildUserInformationWindow(headline, content, btnContent, color);
                break;

            case 'mail-unvalid':
                headline = 'Upps, da ist was schief gelaufen. Versuchen sie es noch einmal!';
                content = 'Die von Ihnen eingegebene Email Adresse entspricht nicht dem gängigen Format für Email Adressen';
                btnContent = 'Schließen';
                color = this.colorAlert;
                this.buildUserInformationWindow(headline, content, btnContent, color); 
                break;

            case 'Array':
                headline = 'Sind Ihre Angaben richtig?';
                let counter = 0;

                
                content = JSON.stringify(arrChecked).replace(/,/g, match =>{
                    counter++
                    return (counter <= 4) ? '\n' : match;
                });
                
                content = content.replace(/["\\\[\]]/g, '');
                content = content.split(/, Auswahl:/g).join('\n\nAuswahl:\n')
                content = content.replace(/Nachricht:/g, '\nNachricht:\n');
                content = content.replace(/(.{31})/g, '$1-\n');
                btnContent = 'Ja';
                color = this.colorSuccess;
                this.saveEntr = entries;
                this.buildUserInformationWindow(headline, content, btnContent, color);
                break; 

            case false:
                headline = 'Upps, da ist was schief gelaufen. Versuchen sie es noch einmal!';
                content = 'Klicken Sie auf Schließen und korrigieren Sie den falschen Eintrag.';
                btnContent = 'Schließen';
                color = this.colorAlert;
                this.buildUserInformationWindow(headline, content, btnContent, color); 
                break;
        }
    }

    buildUserInformationWindow(headline, content, btnContent, color){
        this.headlineInputSend.textContent = headline;
        this.paragraphInputSend.textContent = content;
        this.userInputSendBtn.textContent = btnContent;
        this.userInputSendBtn.style.color = color;
        this.headlineInputSend.style.color = color;
        this.paragraphInputSend.style.color = color;
        
        this.openUserInputSendWindow();
    }

    /**
     * Fenster für die User Info des Form wird sichtbar gemacht.
     */
    openUserInputSendWindow() {
        this.userInputSend.style.display = 'flex';
    }
}
