export default class FormData {
    
    constructor() {
        this.form = document.querySelector('#form');
        this.saveEntr;
        this.userEntries = [];
        this.userSelections = [];
        
    
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


    start() {
        if (this.savedInquiry && this.savedInquiry.length >= 0) {
            this.userEntries = this.savedInquiry;
        }

        if (this.form) {
            this.getUserInfoBtn();
            this.getInputValuesAndBuildObject();
        }

    }

    getUserInfoBtn(){
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
    }

    getInputValuesAndBuildObject(){
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

  
    saveUserEntries(saveEntries) {
        this.userEntries.push(saveEntries);
        localStorage.setItem('saveInquiry', JSON.stringify(saveEntries));
        this.userEntries = [];
        this.userEntries.push(this.savedInquiry);
        localStorage.removeItem('saveInquiry');
        this.form.reset();
        this.getSavedPerformanceSelection()
    }
    

    getSavedPerformanceSelection(){
        let performanceSelection  = {}
        
        this.savedPerformanceSelection.forEach((e, i) => {
            let selectionKey = 'selection' + i;
            performanceSelection[selectionKey] = e;
        });
        
        this.userEntries[0].push(performanceSelection);
        this.validatAndBuildSendStateWindow(true);
    }

  
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
                content = 'Vielen Dank für Ihr Vertrauen. Wir haben Ihre Anfrage erhalten und werden uns schnellstmöglich darum kümmern.';
                btnContent = 'Schließen';
                color = this.colorSuccess;
                this.buildUserInformationWindow(headline, content, btnContent, color);
                break;

            case 'mail-unvalid':
                headline = 'Upps, da ist etwas schiefgelaufen. Versuchen Sie es noch einmal!';
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
                btnContent = 'Ja';
                color = this.colorSuccess;
                this.saveEntr = entries;
                this.buildUserInformationWindow(headline, content, btnContent, color);
                break; 

            case false:
                headline = 'Upps, da ist was schief gelaufen. Versuchen sie es noch einmal!';
                content = 'Klicken Sie auf Schließen und korrigieren Sie den falschen Eintrag (Die Einträge in den Eingabefeldern bleiben erhalten).';
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

    openUserInputSendWindow() {
        this.userInputSend.style.display = 'flex';
    }
}
