<<<<<<< HEAD
import { Router } from "@vaadin/router"; // el goTo

//COMPONENTS IMPORTAODS
import "../components/main-title";

customElements.define(
  "home-comp",
  class extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });

    constructor() {
      super();
      this.render();
    }
    render() {
      //EL CSS DEL SHADOW
      var style = document.createElement("style");

      //CSS
      style.innerHTML = `
       @import url('https://fonts.googleapis.com/css2?family=Odibee+Sans&display=swap');
       
       .button{
        width: 100%;
        align-self: center;
        background: #006CFC;
        border: 10px solid #001997;
        border-radius: 10px;
        cursor: pointer;
        height: 80px;
        margin-bottom: 28px; 

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
      width: 450px;
    }
       @media (min-width: 767px){
           .home {
               max-width: 80%
           }     
       `;
      this.shadow.innerHTML = `
        <maintitle-el>Piedra Papel o Tijera</maintitle-el>
        <div class="button-containers">
              <button class="button signin">Iniciar sesión</button>
              <button class="button signup">Registrarse</button>
        </div>
       
           `;
      this.shadow.appendChild(style);
      // Iniciar sesión button
      const signinButton = this.shadow.querySelector(".signin");
      signinButton.addEventListener("click", () => {
        Router.go("/signin");
      });
      // Registrarse button
      const signupButton = this.shadow.querySelector(".signup");
      signupButton.addEventListener("click", () => {
        Router.go("/signup");
      });
    }
  }
);
=======
import { Router } from "@vaadin/router"; // el goTo

//COMPONENTS IMPORTAODS
import "../components/main-title";

customElements.define(
  "home-comp",
  class extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });

    constructor() {
      super();
      this.render();
    }
    render() {
      //EL CSS DEL SHADOW
      var style = document.createElement("style");

      //CSS
      style.innerHTML = `
       @import url('https://fonts.googleapis.com/css2?family=Odibee+Sans&display=swap');
       
       .button{
        width: 100%;
        align-self: center;
        background: #006CFC;
        border: 10px solid #001997;
        border-radius: 10px;
        cursor: pointer;
        height: 80px;
        margin-bottom: 28px; 

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
      width: 450px;
    }
       @media (min-width: 767px){
           .home {
               max-width: 80%
           }     
       `;
      this.shadow.innerHTML = `
        <maintitle-el>Piedra Papel o Tijera</maintitle-el>
        <div class="button-containers">
              <button class="button signin">Iniciar sesión</button>
              <button class="button signup">Registrarse</button>
        </div>
       
           `;
      this.shadow.appendChild(style);
      // Iniciar sesión button
      const signinButton = this.shadow.querySelector(".signin");
      signinButton.addEventListener("click", () => {
        Router.go("/signin");
      });
      // Registrarse button
      const signupButton = this.shadow.querySelector(".signup");
      signupButton.addEventListener("click", () => {
        Router.go("/signup");
      });
    }
  }
);
>>>>>>> 8b54d820be4a7b8c25a0761282ee739aaa998f24
