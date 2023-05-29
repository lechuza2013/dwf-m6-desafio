import { Router } from "@vaadin/router";
import { state } from "../../../state";
import { off } from "firebase/database";

//COMPONENTS IMPORTAODS
customElements.define(
  "play-comp",
  class extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });

    constructor() {
      super();
      this.render();
      // state.restartRound();
    }
    render() {
      //EL CSS DEL SHADOW
      var style = document.createElement("style");
      var cg = state.getCurrentGame();

      //CSS
      style.innerHTML = `
      .button-containers{
        display: flex;
        flex-direction: column;
        gap: 30px;
      }
      .play-menu{
        gap: 40px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        box-sizing: border-box;

        width: 100%;
        min-height: 20vh;
        padding: 25px;
        align-self: center;
        background: #006CFC;
        border: 10px solid #001997;
        border-radius: 10px;
    
        font-family: "Odibee Sans";
        font-size: 45px;
        font-weight: 400;
        line-height: 50px;
        letter-spacing: 0.05em;
        text-align: center;
        color: white;
    }
    .container-participants{
        display: flex;
        flex-direction: column;
    }
    .main-container{
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        max-width: 50vw;
    }
    .span-versus{
        align-self: center;
        font-size: 6rem;
    }
    .h2{
        margin: 30px auto 5px auto;
       
    }
    .button{
        width: 100%;
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
    }
    @media (max-width: 870px){
      .play-menu{
        gap: 0px;
        flex-direction: column;
        margin-top: 70px;
        min-width: 258px;
      }
      .span-versus{
        margin: 20px auto;
      }
    }
       `;
      this.shadow.innerHTML = `
       <div class="main-container">
            <div class="play-menu">
                <div class="container-participants">
                        <h2 class="h2 fplayer">${
                          cg[Object.keys(cg)[0]].name
                        }</h2>
                        <span>${cg[Object.keys(cg)[0]].score}</span>
                </div>

                <span class="span-versus">VS</span>

                <div class="container-participants">
                        <h2 class="h2 splayer">${
                          cg[Object.keys(cg)[1]].name
                        }</h2>
                        <span>${cg[Object.keys(cg)[1]].score}</span>
                </div>

                </div>
                <div class="button-containers">
                    <button class="button startPlaying">¡Jugar!</button>
                    <button class="button goBack">Volver</button>
                </div>

       </div>
           `;
      // ✔
      // let checkMark = document.createTextNode("✔");
      // if (cg[Object.keys(cg)[0]].online == true) {
      //   let firstPlayerEl = this.shadow.querySelector(".fplayer");
      //   firstPlayerEl.appendChild(checkMark);
      // }
      // if (cg[Object.keys(cg)[1]].online == true) {
      //   let firstPlayerEl = this.shadow.querySelector(".splayer");
      //   firstPlayerEl.appendChild(checkMark);
      // }
      this.shadow.appendChild(style);
      const playButtonEl = this.shadow.querySelector(
        ".startPlaying"
      ) as HTMLElement;
      playButtonEl.addEventListener("click", (e) => {
        playButtonEl.style.color = "#32dd32";
        playButtonEl.textContent = "Esperando";
        state.checkPlayersReady(state.data.userData.longRoomId);
      });
      const goBackButtonEl = this.shadow.querySelector(".goBack");
      goBackButtonEl.addEventListener("click", (e) => {
        state.restartRound();
        state.connectToGameroom(state.data.userData.longRoomId, "disconnect");
        Router.go("/joingame");
      });
    }
  }
);
