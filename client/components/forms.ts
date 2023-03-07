import { Router } from "@vaadin/router";

customElements.define("form-el", class Button extends HTMLElement{
    shadow = this.attachShadow({mode: "open"});
    constructor(){
        super();
        this.render();
    }
    render(){
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
        @import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
           .h2{
                margin: 0 auto;
                height: 50px;
                width: auto;

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
           .form{
            display: flex;
            justify-content: space-evenly;
            flex-direction: column;
            gap: 50px;
           }
        `;
        // PATHNAME
        if (location.pathname == "/")
        {
            this.shadow.innerHTML = `
            <form class="form">
                    <h2 class="h2">Tu Nombre</h2>
                    <input type="text" class="input" name="name" required>
                    <button class="button">Empezar</button>
            </form>
        `;
        const formEl = this.shadow.querySelector(".form") as HTMLElement;
        console.log("Form? ", formEl);
        formEl.addEventListener("submit", function (e){
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const objeto = Object.fromEntries(formData.entries());
        console.log("Nombre:  ",objeto.name);
       
        // ROUTER NO ANDA 
        Router.go("/home");
       });
        }
        
        this.shadow.appendChild(style);
    }
});