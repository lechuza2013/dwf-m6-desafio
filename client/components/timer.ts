customElements.define(
  "timer-el",
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
        body {
        margin: 0 auto;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        background: radial-gradient(#93d9f9, #0cb0b5);
        font-family: "Lobster", cursive;
        }
        .countdown {
        position: relative;
        width: 400px;
        height: 400px;
        transform-style: preserve-3d;
        perspective: 1000px;
        margin: 0 auto;
        }
        .countdown:before {
        content: '';
        position: absolute;
        bottom: -50px;
        left: 0;
        width: 100%;
        height: 10px;
        background: transparent;
        border-radius: 50%;
        filter: blur(14px);
        animation: shadow 1s linear infinite;
        }
        @keyframes shadow {
        0%, 100% {
            transform: scale(0.5);
        }
        
        50% {
            transform: scale(1);
        }
        }
        .countdown .number {
        margin: 0 auto;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        transform: rotateY(270deg);
        animation: animate 10s linear infinite;
        }
        .countdown .number:nth-child(1) {
        animation-delay: 0s;
        }
        .countdown .number:nth-child(2) {
        animation-delay: 1s;
        }
        .countdown .number:nth-child(3) {
        animation-delay: 2s;
        }
        
        .countdown .number h2 {
        margin: 0;
        padding: 0;
        font-size: 20em;
        color: #009048;
        }
        @keyframes animate {
        0% {
            transform: rotateY(90deg);
        }
        
        10%, 100% {
            transform: rotateY(-90deg);
        }
        }
        `;
      //HTML
      this.shadow.innerHTML = `
        <div class="countdown">
        
            <div class="number">
            <h2>3</h2>
            </div>
            
            <div class="number">
            <h2>2</h2>
            </div>
            <div class="number">
            <h2>1</h2>
            </div>
        
        </div>
        `;
      this.shadow.appendChild(style);
    }
  }
);
