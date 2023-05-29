import { Router } from "@vaadin/router"; // el goTo
import { state } from "../../../state";
import "../../../components/timer";

//COMPONENTS IMPORTAODS

customElements.define(
  "duel-comp",
  class extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });

    constructor() {
      super();
      this.render();
    }
    render() {
      //EL CSS DEL SHADOW
      var style = document.createElement("style");
      const hands = {
        tijeras: require("url:../../../components/images/tijera.png"),
        piedra: require("url:../../../components/images/piedra.png"),
        papel: require("url:../../../components/images/papel.png"),
      };
      const resultsImages = {
        perdiste: require("url:../../../components/images/perdiste.png"),
        ganaste: require("url:../../../components/images/ganaste.png"),
        empate0: require("url:../../../components/images/empate.png"),
      };
      //CSS
      style.innerHTML = `
      width: 100%;
      max-width: 700px;
      height: 100%;
      display: flex;
      justify-content: space-evenly;
      flex-direction: column;
      padding: 50px;
  }
  @media (min-width: 767px){
      .duel {
          margin: 0 auto;
          padding-top: 0;
      }
      .container__img{
          height: 200px;
      }
      .container{
          gap: 120px;
      }
  }
  .container{     
      display:flex;
      position: fixed;
      bottom: -56px;
      left: 50%;
      transform: translate(-50%, 0);
      justify-content: center;
      align-items: center;
      align-self: center;
      gap: 95px;
      margin: 0 auto;
      
      width: 100vw;
  }
  .container__img{
      cursor: pointer;
      position: relative;
      height: 20vh;   
      
      transition: transform 250ms;
  }
  .container__img:hover{
      transform: translateY(-50px);
      
  }
  @media (max-height: 367px){
      .container{
          display: none;
      }
  }
  @media (max-width: 460px){
      .container{
          justify-content: center;
          gap: 0;
      }
  }
  .computer-hand{
      position: relative;
      height: 25vh; 
      
      transform: rotate(180deg);
  }
  .computer-container{
      margin: 0 auto;
      display:flex;
      justify-content: center;
      align-items: center;
      align-self: center;
      position: fixed;
      top: -12px;
  }
  .final__results{
      min-width: 370px;
      min-height: 37px;
      width: 100%;
      height: 100%;
      top: 50%;
      left: 50%;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
     
      z-index: 10;
      margin: 0 auto;
      gap: 15px;
      transform: translate(-50%, -50%);
  }
   .final__results > img{
    width: 88vw;
    height: 44vh;
   }
  .button{
    min-width: 180px;
    width: 50vw;
    align-self: center;
    background: #006CFC;
    border: 10px solid #001997;
    border-radius: 10px;
    cursor: pointer;
    height: 80px;

    font-family: "Odibee Sans";
    font-size: 45px;
    font-weight: 400;
    line-height: 50px;
    letter-spacing: 0.05em;
    text-align: center;
    color: white;
}
.button:hover{
    border: 1px solid white;
    transform: scale(1.1);
    transition: transform 250ms;
}`;
      this.shadow.innerHTML = `
      <timer-el class="timer"></timer-el>
    <div class="container">
            <img class="container__img papel"src="${hands.papel}" id="papel">
            <img class="container__img piedra"src="${hands.piedra}" id="piedra">
            <img class="container__img tijera"src="${hands.tijeras}" id="tijera">
    </div>
      `;
      this.shadow.appendChild(style);
      var papelHand = this.shadow.querySelector(".papel") as HTMLElement;
      var piedraHand = this.shadow.querySelector(".piedra") as HTMLElement;
      var tijeraHand = this.shadow.querySelector(".tijera") as HTMLElement;
      //Funciones para los eventListener (Está hecho así para mejor manipulación al finalizar el timer)
      var papelFunction = () => {
        state.sendChoice("papel");
        (papelHand as HTMLElement).style.opacity = "1";
        (piedraHand as HTMLElement).style.opacity = "0.5";
        //Se elimina el event listener de los otros
        piedraHand.removeEventListener("click", piedraFunction);
        (tijeraHand as HTMLElement).style.opacity = "0.5";
        tijeraHand.removeEventListener("click", piedraFunction);
      };
      var piedraFunction = () => {
        state.sendChoice("piedra");

        (piedraHand as HTMLElement).style.opacity = "1";
        //Se elimina el event listener de los otros
        (papelHand as HTMLElement).style.opacity = "0.5";
        papelHand.removeEventListener("click", piedraFunction);
        (tijeraHand as HTMLElement).style.opacity = "0.5";
        tijeraHand.removeEventListener("click", piedraFunction);
      };
      var tijeraFunction = () => {
        state.sendChoice("tijeras");
        (tijeraHand as HTMLElement).style.opacity = "1";
        //Se elimina el event listener de los otros
        (piedraHand as HTMLElement).style.opacity = "0.5";
        piedraHand.removeEventListener("click", piedraFunction);
        (papelHand as HTMLElement).style.opacity = "0.5";
        papelHand.removeEventListener("click", piedraFunction);
      };

      // EVENT LISTENERS.
      papelHand.addEventListener("click", papelFunction);
      piedraHand.addEventListener("click", piedraFunction);
      tijeraHand.addEventListener("click", tijeraFunction);

      // JUGADA
      let resultEl: any;
      let timerEl = this.shadow.querySelector(".timer") as HTMLElement;

      var intervalId = setTimeout(() => {
        var contrincantPlay: string;
        var localPlayerPlay: string;
        var cg = state.getCurrentGame();
        state.data.currentGame;
        //Se elimina el timer de 3 segundos
        timerEl.remove();
        //Se termina el conteo
        clearTimeout(intervalId);
        // Los if para saber cual es la jugada de quien
        if (
          state.data.currentGame[state.data.userData.userId] ==
          cg[Object.keys(cg)[0]]
        ) {
          localPlayerPlay = cg[Object.keys(cg)[0]].choice;
          contrincantPlay = cg[Object.keys(cg)[1]].choice;
        } else if (
          state.data.currentGame[state.data.userData.userId] ==
          cg[Object.keys(cg)[1]]
        ) {
          localPlayerPlay = cg[Object.keys(cg)[1]].choice;
          contrincantPlay = cg[Object.keys(cg)[0]].choice;
        }
        resultEl = document.createElement("div");
        resultEl.classList.add("final__results");

        if (contrincantPlay == "" || localPlayerPlay == "") {
          piedraHand.removeEventListener("click", piedraFunction);
          papelHand.removeEventListener("click", piedraFunction);
          tijeraHand.removeEventListener("click", piedraFunction);

          console.log("VOS: ", localPlayerPlay, "EL: ", contrincantPlay);
          resultEl.style.background = "rgba(42, 40, 40, 0.8)";
          resultEl.innerHTML = `
                  <img src="${resultsImages.empate0}"/>
                  <maintitle-el>Alguien no eligió</maintitle-el>
                  <button class="button">Continuar</button>
                  `;
        } else {
          var resultado = state.whoWins(localPlayerPlay, contrincantPlay);
          if (resultado == true) {
            resultEl.style.background = "rgba(136, 137, 73, 0.8)";
            resultEl.innerHTML = `
                              <img src="${resultsImages.ganaste}"/>
                              <button class="button">Continuar</button>
                              `;
            console.log("Ganaste!");
          } else if (resultado == false) {
            resultEl.style.background = "rgba(137, 73, 73, 0.8)";
            resultEl.innerHTML = `
                              <img src="${resultsImages.perdiste}"/>
                              <button class="button">Continuar</button>
                              `;
            console.log("El contrincante ganó!");
          } else if (resultado == "Empate") {
            resultEl.style.background = "rgba(42, 40, 40, 0.8)";
            resultEl.innerHTML = `
                              <img src="${resultsImages.empate0}">
                              <maintitle-el>Empate</maintitle-el>
                              <button class="button">Continuar</button>
                              `;
            console.log("Empate");
          }
        }
        this.shadow.appendChild(resultEl);
        console.log("Me ejecute? WTF");
        var continueButtonEl = this.shadow.querySelector(".button");
        console.log(cg);

        continueButtonEl.addEventListener("click", () => {
          state.restartRound();
          resultEl.remove();
          Router.go("/play");
        });
      }, 3200);
    }
  }
);
