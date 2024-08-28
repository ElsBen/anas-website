import FormData from"../updates/js/FormData.js";export default class PerformanceSideData{constructor(){this.checkBoxes=document.querySelectorAll("input"),this.performanceBtn=document.getElementsByClassName("select-power-box-btn"),this.submitButton=document.getElementsByClassName("select-power-box-btn"),this.formDataModule=new FormData,this.userSelections=this.formDataModule.userSelections,this.selection=""}checkInfo(){Array.from(this.performanceBtn).forEach(e=>{e.addEventListener("click",()=>{this.checkBoxes.forEach(e=>{let t=e.checked;t?this.validateUserSelection(e.id):console.log("checkbox unchecked!")})})}),this.iterateSubmitBtn()}validateUserSelection(e){switch(e){case"basic-shooting":this.selection="Basic Shooting";break;case"basic-event":this.selection="Basic Event";break;case"basic-special":this.selection="Basic Besondere Anlässe";break;case"premium-shooting":this.selection="Premium Shooting";break;case"premium-event":this.selection="Premium Event";break;case"premium-special":this.selection="Premium Besondere Anlässe";break;case"exclusive-shooting":this.selection="Exklusiv Shooting";break;case"exclusive-event":this.selection="Exklusiv Event";break;case"exclusive-special":this.selection="Exklusiv Besondere Anlässe";break;default:console.log("no accordance with checkbox ID!!!")}this.saveSelection()}saveSelection(){this.userSelections.push(this.selection),localStorage.setItem("savePerformanceSelection",JSON.stringify(this.userSelections))}iterateSubmitBtn(){Array.from(this.submitButton).forEach(e=>{e.addEventListener("click",()=>{e.setAttribute("href","./kontakt.html")})})}}