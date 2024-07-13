import Formdata from './Formdata.js'

export default class PerformanceSideData {

    constructor() {
        this.formData = document.querySelectorAll('input');
        this.performanceBtn = document.getElementsByClassName(
            'leistungsbox-btn-auswaehlen',
        );
        this.submitButton = document.getElementsByClassName('leistungsbox-btn-auswaehlen');
        this.formDataModule = new Formdata;
        this.userSelections = this.formDataModule.userSelections;
        this.selection = '';
    }

    checkInfo() {
        Array.from(this.performanceBtn).forEach((button) => {
            button.addEventListener('click', (b) => {
                // schauen ob die Daten ohne den Teil übermittelt werden können!
                // b.preventDefault();
                this.formData.forEach((inp) => {
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

    validateUserSelection(selectionId) {
        switch (selectionId) {
            case 'basic-shooting':
                console.log('Basic Shooting');
                this.selection = 'Basic Shooting';
                break;
            case 'basic-event':
                console.log('Basic Event');
                this.selection = 'Basic Event';
                break;
            case 'basic-particularly':
                console.log('Basic Besondere Anlässe');
                this.selection = 'Basic Besondere Anlässe';
                break;
            case 'premium-shooting':
                console.log('Premium Shooting');
                this.selection = 'Premium Shooting';
                break;
            case 'premium-event':
                console.log('Premium Event');
                this.selection = 'Premium Event';
                break;
            case 'premium-particularly':
                console.log('Premium Besondere Anlässe');
                this.selection = 'Premium Besondere Anlässe';
                break;
            case 'exclusive-shooting':
                console.log('Exklusiv Shooting');
                this.selection = 'Exklusiv Shooting';
                break;
            case 'exclusive-event':
                console.log('Exklusiv Event');
                this.selection = 'Exklusiv Event';
                break;
            case 'exclusive-particularly':
                console.log('Exklusiv Besondere Anlässe');
                this.selection = 'Exklusiv Besondere Anlässe';
                break;
            default:
                console.log('no accordance with checkbox ID!!!');
        }

        this.saveSelection();
    }

    saveSelection() {
        this.userSelections.push(this.selection);
        console.log(this.userSelections);
    }

    iterateSubmitBtn(){
        Array.from(this.submitButton).forEach(e => {
            e.addEventListener('click', function() {
                window.location.href = '../../kontakt.html';
            });
        })
    };
}
