import { state } from "../../state";

import "../../components/main-title";

customElements.define(
  "joingame-comp",
  class extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });

    constructor() {
      super();
      this.render();
      let formEl = this.shadow.querySelector(".form-joingame");
      formEl.addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const objeto = Object.fromEntries(formData.entries());
        console.log("Objeto: ", objeto);
        state.askRTDBroom(objeto.inputRoomID);
      });
    }
    render() {
      //EL CSS DEL SHADOW
      var style = document.createElement("style");

      //CSS
      style.innerHTML = `
      .form-joingame{
        height: 100%;
        width: 100%;
        max-width: 80%;
        display: flex;
        justify-content: space-evenly;
        flex-direction: column;
        padding: 50px;
        gap: 50px;
        margin-top: 15%;
       }
       .inputs{
        height: 70px;
        border: 10px solid #182460;
        border-radius: 10px;
        
        font-family: Odibee Sans;
        font-size: 45px;
        font-weight: 400;
        line-height: 50px;
        letter-spacing: 0.05em;
        text-align: center; 
       }
       .inputs::placeholder{
        font-family: "Odibee Sans";
        font-size: 45px;
        font-weight: 400;
        line-height: 50px;
        letter-spacing: 0.05em;
        text-align: center;
        color: grey;
        opacity: 0.5;
        font-family: Odibee Sans;
       
       }
       ::-webkit-input-placeholder {
        text-align: center;
       }
       :-ms-input-placeholder {  
        text-align: center; 
       }
       .labels{
        margin: 0 auto;
        height: 30px;
        width: auto;
       
        font-family: Odibee Sans;
        font-size: 45px;
        font-weight: 400;
        line-height: 50px;
        letter-spacing: 0.05em;
        text-align: center;        
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
       `;
      this.shadow.innerHTML = `
      <maintitle-el>Piedra Papel o Tijera</maintitle-el>
      <form class="form-joingame">
            <label for="inputRoomID" class="labels">INGRESA LA ROOM ID</label>
            <input class="inputs input-roomid" type="" name="inputRoomID" minlength="4" maxlength="4" required/>
            <button class="button">Entrar</button>
      </form>
      `;
      this.shadow.appendChild(style);
    }
  }
);
