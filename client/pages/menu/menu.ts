import { Router } from "@vaadin/router"; // el goTo
import { state } from "../../state";

import "../../components/main-title";

customElements.define(
  "menu-comp",
  class extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });

    constructor() {
      super();
      this.render();

      const signOffButtonEl = this.shadow.querySelector(".sign-off");
      signOffButtonEl.addEventListener("click", () => {
        let emptyState = {
          userId: "",
          userName: "",
          userPassword: "",
          userEmail: "",
          rooms: [],
          longRoomId: 0,
          shortRoomId: 0,
        };
        state.setState(emptyState);
        window.alert("Sesión cerrada");
        Router.go("/");
      });

      const joinGameButtonEl = this.shadow.querySelector(".join-game");
      joinGameButtonEl.addEventListener("click", () => {
        Router.go("/joingame");
      });

      const newGameButtonEl = this.shadow.querySelector(".new-game");
      newGameButtonEl.addEventListener("click", () => {
        state.createRoom(
          state.data.userData.userId,
          state.data.userData.userName
        );
      });
    }
    render() {
      //EL CSS DEL SHADOW
      var style = document.createElement("style");

      //CSS
      style.innerHTML = `
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
       .button-containers{
        display: flex;
        flex-direction: column;
        gap: 15px;
       }
       .consult-room{
        margin-top: 50px;
       }
       .consult-room:hover{
        transform: scale(1.05);
       }
      
       `;
      this.shadow.innerHTML = `
      <maintitle-el>Piedra Papel o Tijera</maintitle-el>
       <div class="button-containers">
          <button class="button new-game">Nuevo juego</button>
          <button class="button join-game">Ingresar a una sala</button>
          <button class="button sign-off">Cerrar sesión</button>
      </div>
      <button class="button consult-room">Gamerooms Creadas</button>

      `;
      this.shadow.appendChild(style);
    }
  }
);
