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
            button.addEventListener('click', () => {
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
                this.selection = 'Basic Shooting';
                break;
            case 'basic-event':
                this.selection = 'Basic Event';
                break;
            case 'basic-particularly':
                this.selection = 'Basic Besondere Anlässe';
                break;
            case 'premium-shooting':
                this.selection = 'Premium Shooting';
                break;
            case 'premium-event':
                this.selection = 'Premium Event';
                break;
            case 'premium-particularly':
                this.selection = 'Premium Besondere Anlässe';
                break;
            case 'exclusive-shooting':
                this.selection = 'Exklusiv Shooting';
                break;
            case 'exclusive-event':
                this.selection = 'Exklusiv Event';
                break;
            case 'exclusive-particularly':
                this.selection = 'Exklusiv Besondere Anlässe';
                break;
            default:
                console.log('no accordance with checkbox ID!!!');
        }

        this.saveSelection();
    }

    saveSelection() {
        this.userSelections.push(this.selection);
        localStorage.setItem('savePerformanceSelection', JSON.stringify(this.userSelections));
    }

    iterateSubmitBtn(){
        Array.from(this.submitButton).forEach(e => {
            e.addEventListener('click', function() {
                window.location.href = '../../kontakt.html';
            });
        })
    };
}
