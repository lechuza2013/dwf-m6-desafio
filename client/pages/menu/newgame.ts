<<<<<<< HEAD
import { state } from "../../state";

import "../../components/main-title";
import "../../components/subtitle";

customElements.define(
  "newgame-comp",
  class extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });

    constructor() {
      super();
      this.render();
      state.connectToGameroom(state.data.userData.longRoomId);
    }
    render() {
      //EL CSS DEL SHADOW
      var style = document.createElement("style");

      //CSS
      style.innerHTML = `
      .sharecode{
        font-family: "Lobster", cursive;
        font-size: 5rem;
        font-weight: 700;
        line-height: 48px;
        letter-spacing: 0.1em;
        text-align: center;
      }
      .main-container{
        display: flex;
        flex-direction: column
      }
      .
       `;
      this.shadow.innerHTML = `
      <maintitle-el>Piedra Papel o Tijera</maintitle-el>
      <div class="main-container">
        <subtitle-el>Compartí el código</subtitle-el>
        <h1 class="sharecode">${state.data.userData.shortRoomId}</h1>
        <subtitle-el>Con tu contrincante</subtitle-el>
      </div>
      `;
      this.shadow.appendChild(style);
    }
  }
);
=======
import { state } from "../../state";

import "../../components/main-title";
import "../../components/subtitle";

customElements.define(
  "newgame-comp",
  class extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });

    constructor() {
      super();
      this.render();
      state.connectToGameroom(state.data.userData.longRoomId);
    }
    render() {
      //EL CSS DEL SHADOW
      var style = document.createElement("style");

      //CSS
      style.innerHTML = `
      .sharecode{
        font-family: "Lobster", cursive;
        font-size: 5rem;
        font-weight: 700;
        line-height: 48px;
        letter-spacing: 0.1em;
        text-align: center;
      }
      .main-container{
        display: flex;
        flex-direction: column
      }
      .
       `;
      this.shadow.innerHTML = `
      <maintitle-el>Piedra Papel o Tijera</maintitle-el>
      <div class="main-container">
        <subtitle-el>Compartí el código</subtitle-el>
        <h1 class="sharecode">${state.data.userData.shortRoomId}</h1>
        <subtitle-el>Con tu contrincante</subtitle-el>
      </div>
      `;
      this.shadow.appendChild(style);
    }
  }
);
>>>>>>> 8b54d820be4a7b8c25a0761282ee739aaa998f24
