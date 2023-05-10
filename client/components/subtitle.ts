customElements.define(
  "subtitle-el",
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
           @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
           .h2{
                margin: 0 auto;
                height: 50px;
                width: auto;
                min-width: 340px;

                font-family: Odibee Sans;
                font-size: 45px;
                font-weight: 400;
                line-height: 50px;
                letter-spacing: 0.05em;
                text-align: center;        
           }
           .span{
               opacity: 0.5;
           }
           `;
      this.shadow.innerHTML = `
           <h2 class="h2">${this.textContent}</h2>
           `;
      this.shadow.appendChild(style);
    }
  }
);
