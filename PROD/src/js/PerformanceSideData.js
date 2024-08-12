import FormData from './Formdata.js'

export default class PerformanceSideData {

    /**
     * Global gesetzte Variablen. alle Funktionen können darauf zugreifen.
     */

    constructor() {
        this.checkBoxes = document.querySelectorAll('input');
        this.performanceBtn = document.getElementsByClassName(
            'select-power-box-btn',
        );
        this.submitButton = document.getElementsByClassName('select-power-box-btn');
        this.formDataModule = new FormData;
        this.userSelections = this.formDataModule.userSelections;
        this.selection = '';
    }

    /**
     * Über Checkboxen iterieren und filtern der gecheckten Boxen.
     */
    checkInfo() {
        Array.from(this.performanceBtn).forEach((button) => {
            button.addEventListener('click', () => {
                this.checkBoxes.forEach((inp) => {
                    let checkedValue = inp.checked;
                    if (checkedValue) {
                        this.validateUserSelection(inp.id);
                    } else {
                        console.log('checkbox unchecked!');
                    }
                });
            });
        });
        this.iterateSubmitBtn();
    }

    /**
     * Die ID der ausgewählten Checkbox wird übergeben 
     * und Ihre ID mit den Strings verglichen.
     * Bei Übereinstimmung wird die Globale Variable selection gefüllt. 
     * @param {string} selectionId ID der ausgewählten Checkbox
     */
    validateUserSelection(selectionId) {
        switch (selectionId) {
            case 'basic-shooting':
                this.selection = 'Basic Shooting';
                break;
            case 'basic-event':
                this.selection = 'Basic Event';
                break;
            case 'basic-special':
                this.selection = 'Basic Besondere Anlässe';
                break;
            case 'premium-shooting':
                this.selection = 'Premium Shooting';
                break;
            case 'premium-event':
                this.selection = 'Premium Event';
                break;
            case 'premium-special':
                this.selection = 'Premium Besondere Anlässe';
                break;
            case 'exclusive-shooting':
                this.selection = 'Exklusiv Shooting';
                break;
            case 'exclusive-event':
                this.selection = 'Exklusiv Event';
                break;
            case 'exclusive-special':
                this.selection = 'Exklusiv Besondere Anlässe';
                break;
            default:
                console.log('no accordance with checkbox ID!!!');
        }

        this.saveSelection();
    }

    /**
     * Gibt den Wert an das Array userSelections im formDataModule weiter.
     * Danach werden die Daten im localstorage Gespeichert damit es nicht zum Datenverlust 
     * beim aufruf des FormData-Modul's kommt. 
     */
    saveSelection() {
        this.userSelections.push(this.selection);
        localStorage.setItem('savePerformanceSelection', JSON.stringify(this.userSelections));
    }

    /**
     * submitButton wird in ein Array umgewandelt damit darüber interiert wird
     * und auf jeden einzelnen Button eine href zum Formular gegeben werden kann. 
     */
    iterateSubmitBtn(){
        Array.from(this.submitButton).forEach(e => {
            e.addEventListener('click', function() {
                window.location.href = '../../kontakt.html';
            });
        })
    };
}
