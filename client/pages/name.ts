import {Router} from "@vaadin/router" // el goTo

//COMPONENTS IMPORTAODS
import "../components/main-title";
import "../components/subtitle";
import "../components/forms";
customElements.define("name-comp", class  extends HTMLElement{
    shadow = this.attachShadow({mode: "open"});
    
    constructor(){
        super();
        this.render();

//!! PROBABLEMENTE NO FUNCIONE EL FORM CON COMPONENTS ADENTRO.
    //     const formEl = this.shadow.querySelector(".form") as HTMLFormElement;
    //     console.log("Form? ", formEl);
    //     formEl.addEventListener("submit", function (e){
    //     e.preventDefault();
    //     const formData = new FormData(e.target as HTMLFormElement);
    //     const objeto = Object.fromEntries(formData.entries());
    //     console.log("Nombre:  ",objeto);
    //    });
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
    
       .little-container{
        display: flex;
        flex-direction: column;
        gap: 10px;
       }

       @media (min-width: 767px){
           .home {
               max-width: 80%
           }
       `;
       this.shadow.innerHTML = `
       <div class="home">
       <maintitle-el>Piedra Papel o Tijera</maintitle-el>
        <form-el></form-el>
           </div>
           `;
       this.shadow.appendChild(style);
       
    }
       
         }
    
)
