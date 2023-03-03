customElements.define("button-el", class Button extends HTMLElement{
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
        <button class="button">${this.textContent}</button>
        `;
        this.shadow.appendChild(style);
    }
});