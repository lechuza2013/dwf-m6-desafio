import { Router } from "@vaadin/router"; // el goTo
import { state } from "../state";

customElements.define(
  "signup-comp",
  class extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });

    constructor() {
      super();
      this.render();

      const formEl = this.shadow.querySelector(
        ".form-signup"
      ) as HTMLFormElement;

      formEl.addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const objeto = Object.fromEntries(formData.entries());
        console.log("Datos ingresados: ", objeto);
        state.signup(objeto);
      });
    }
    render() {
      //EL CSS DEL SHADOW
      var style = document.createElement("style");

      //CSS
      style.innerHTML = `
      .form-signup{
        height: 100%;
        width: 100%;
        max-width: 80%;
        display: flex;
        justify-content: space-evenly;
        flex-direction: column;
        padding: 50px;
        gap: 50px;
        padding: 10% auto;
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
       <form class="form-signup">
            <label for="inputEmail" class="labels">Email</label>
            <input class="inputs input-email" type="email" name="inputEmail"/>

            <label for="inputName" class="labels">Nombre</label>
            <input class="inputs input-name" type="text" name="inputName"/>

            <label for="inputPassword" class="labels">Contraseña</label>
            <input class="inputs "input-password type="password" name="inputPassword"/>
       
            <button class="button">Registrarse</button>
        </form>
       
           `;
      this.shadow.appendChild(style);
    }
  }
);
