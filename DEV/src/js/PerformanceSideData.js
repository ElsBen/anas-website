export default class PerformanceSideData {
    constructor() {
        this.formData = document.querySelectorAll('input');
        this.performanceBtn = document.getElementsByClassName(
            'leistungsbox-btn-auswaehlen',
        );
    }

    // Hier evtl. die onclick-Methode für den Button verwenden

    checkInfo() {
        console.log(this.formData);
        console.log(this.formData[0].checked);
        console.log(this.formData[0].value);
        Array.from(this.performanceBtn).forEach((button) => {
            button.addEventListener('click', (b) => {
                b.preventDefault();
                this.formData.forEach((inp) => {
                    let checkedValue = inp.checked;
                    if (checkedValue) {
                        console.log('Hat geklappt');
                        console.log(inp.id);
                        // Hier eine Logik zum speichern und oder absenden des checked-Wertes einfügen
                    } else {
                        console.log('Hat nicht geklappt');
                    }
                });
            });
        });
    }
}
