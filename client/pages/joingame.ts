import {Router} from "@vaadin/router" // el goTo

//COMPONENTS IMPORTAODS
import "../components/button";
import "../components/main-title";
import "../components/input";
customElements.define("joingame-comp", class  extends HTMLElement{
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
       @import url('https://fonts.googleapis.com/css2?family=Odibee+Sans&display=swap');
       .home{
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

       @media (min-width: 767px){
           .home {
               max-width: 80%
           }
       `;
       this.shadow.innerHTML = `
       <div class="home">
           <maintitle-el class="h1">Piedra Papel <span class="span">o</span> Tijeras</maintitle-el>
           <input-el class="input"></input-el>
           <button-el class="button uno">Ingresar a la sala</button-el>
        </div>
           `;
       this.shadow.appendChild(style);
        }
       
         }
    
)
