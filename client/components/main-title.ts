customElements.define("maintitle-el", class extends HTMLElement{
    shadow = this.attachShadow({mode: "open"});
    constructor(){
        super();
        this.render();
    }
    render(){
           //EL CSS DEL SHADOW
           var style = document.createElement("style");
          
           //CSS
           style.innerHTML = `
           @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
           .h1{
               align-self: center;
               max-width: 400px;
               font-family: "Lobster", cursive;
               font-style: normal;
               font-weight: 700;
               font-size: 6rem;
               line-height: 98.1%;
               margin: 0 auto 25px 15px;
               color: #009048;
               
           }
           .span{
               opacity: 0.5;
           }
           `;
           this.shadow.innerHTML = `
           <h1 class="h1">${this.textContent}</h1>
           `
           this.shadow.appendChild(style);
    }
})