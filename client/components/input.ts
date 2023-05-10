customElements.define(
  "input-el",
  class Button extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });
    constructor() {
      super();
      this.render();
    }
    render() {
      // El CSS del Shadow
      var style = document.createElement("style");

      //CSS
      style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Odibee+Sans&display=swap');

        .input{
            width: 94%;
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
        .input::placeholder{
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
        `;
      this.shadow.innerHTML = `
        <input class="input">
        `;
      this.shadow.appendChild(style);
    }
  }
);
