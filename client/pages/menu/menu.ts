import { Router } from "@vaadin/router"; // el goTo
import { state, API_BASE_URL } from "../../state";
import "../../components/main-title";

customElements.define(
  "menu-comp",
  class extends HTMLElement {
    shadow = this.attachShadow({ mode: "open" });

    constructor() {
      super();
      this.render();

      const signOffButtonEl = this.shadow.querySelector(".sign-off");
      signOffButtonEl.addEventListener("click", () => {
        let emptyState = {
          userId: "",
          userName: "",
          userPassword: "",
          userEmail: "",
          rooms: [],
          longRoomId: 0,
          shortRoomId: 0,
        };
        state.setState(emptyState);
        window.alert("Sesión cerrada");
        Router.go("/");
      });

      const joinGameButtonEl = this.shadow.querySelector(".join-game");
      joinGameButtonEl.addEventListener("click", () => {
        Router.go("/joingame");
      });

      const newGameButtonEl = this.shadow.querySelector(".new-game");
      newGameButtonEl.addEventListener("click", () => {
        state.createRoom(
          state.data.userData.userId,
          state.data.userData.userName
        );
      });

      const consultGameroomsEl = this.shadow.querySelector(".consult-room");
      //El fetch lo puse acá por temas prácticos
      consultGameroomsEl.addEventListener("click", () => {
        console.log("consultGameRoomsEl clicked");

        fetch(API_BASE_URL + "/getRoomsid/" + state.data.userData.userId, {
          method: "GET",
          headers: { "content-type": "application" },
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log("Data recibida: ", data);
            this.showGameRooms(data);
          });
      });
    }
    showGameRooms(roomsData: any) {
      const exitCloseGamerooms = this.shadow.querySelector(
        ".closeButton"
      ) as HTMLElement;
      exitCloseGamerooms.style.display = "initial";
      const contenedorEl = this.shadow.querySelector(
        ".template__container"
      ) as HTMLElement;
      const contenedorDosEl = this.shadow.querySelector(
        ".template__results"
      ) as HTMLElement;
      contenedorDosEl.style.display = "initial";
      contenedorEl.style.display = "flex";
      const template = this.shadow.querySelector(
        ".template__gamerooms"
      ) as HTMLTemplateElement;

      exitCloseGamerooms.addEventListener("click", () => {
        contenedorEl.innerHTML = "";
        contenedorEl.style.display = "none";
        contenedorDosEl.style.display = "none";
      });

      console.log("contenedorEl: ", contenedorEl);
      console.log("template: ", template);
      // Players Element
      const playerOneNameEl =
        template.content.querySelector(".playerone__name");
      const playerTwoNameEl =
        template.content.querySelector(".playertwo__name");
      // Scores Elements
      const playerOneScoreEl =
        template.content.querySelector(".playerone__score");
      const playerTwoScoreEl =
        template.content.querySelector(".playertwo__score");

      // Short Room ID
      const shortRoomIdEl = template.content.querySelector(
        ".shortRoomID__id"
      ) as HTMLElement;

      //Elements
      console.log(
        "All elements: ",
        playerOneNameEl,
        playerTwoNameEl,
        playerOneScoreEl,
        playerTwoScoreEl,
        shortRoomIdEl
      );
      if (roomsData.message) {
        window.alert(roomsData.message);
      } else {
        console.log("miau");

        Object.keys(roomsData).forEach(function (key) {
          // Players
          console.log(key, roomsData[key].shortRoomID);
          playerOneNameEl.textContent = roomsData[key].playerOneName;
          playerTwoNameEl.textContent = roomsData[key].playerTwoName;

          // Scores
          playerOneScoreEl.textContent = roomsData[key].playerOneScore;
          playerTwoScoreEl.textContent = roomsData[key].playerTwoScore;

          // Short Room ID
          shortRoomIdEl.textContent = roomsData[key].shortRoomID;
          const clone = document.importNode(template.content, true);
          contenedorEl.appendChild(clone);
        });
      }

      // Poner un If por si no creó ninguna room y devolvio un 'message'
    }
    render() {
      //EL CSS DEL SHADOW
      var style = document.createElement("style");

      //CSS
      style.innerHTML = `
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
       .button-containers{
        display: flex;
        flex-direction: column;
        gap: 15px;
       }
       .consult-room{
        margin-top: 50px;
       }

       .template__results{ 
        display: none;
        width: 82vw;
        flex-direction: column;
        height: 86vh;
        top: 50px;
        
        left: 0;
        right: 0;
        position: absolute;
        background: #006CFC;
        border: 10px solid #001997;
        border-radius: 10px;

        margin: auto;
        
       }
    .button__container{
        display: flex;
        justify-content: flex-end;
       }
    .closeButton{ 
      display: none;
      width: 50px;
      height: 50px;
      align-self: center;
      background: #006CFC;
      border: 3px solid #001997;
      border-radius: 10px;
      cursor: pointer;
    
      font-family: "Odibee Sans";
      font-size: 30px;
      font-weight: initial;
      line-height: normal;
      letter-spacing: 0.05em;
      text-align: center;
      color: white;
    }
    .shortRoomID{
      display: flex;
      justify-content: center;
      
      border-bottom: dotted;
      border-color: white;
      border-width: thick;

    }
    .shortRoomID__id{
      font-family: "Lobster", cursive;
        font-size: 2rem;
        font-weight: 700;
        line-height: 48px;
        letter-spacing: 0.1em;
        text-align: center;
        color: white;
        
        padding: 10px;
    }
    .template__container{
      overflow: auto;
      display: none;
      height: 80vh;
      flex-direction: column;
      padding-left: 32px;
      padding-right: 32px;
    }
    .h3{  
        margin: 0;
        height: 80px;
        font-family: "Odibee Sans";
        font-size: 45px;
        font-weight: 400;
        line-height: 50px;
        letter-spacing: 0.05em;
        text-align: center;
        color: white;
    }
    .gameroom__container-contrincants{
      margin-top: 20px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 15px;
    }
    .score{
      margin: 0;
      height: 80px;
      font-family: "Odibee Sans";
      font-size: 45px;
      font-weight: 400;
      line-height: 50px;
      letter-spacing: 0.05em;
      text-align: center;
      color: white;
    }
    .span {
      font-size: 30px;
      color: red;
    }
       `;
      this.shadow.innerHTML = `
      <maintitle-el>Piedra Papel o Tijera</maintitle-el>
       <div class="button-containers">
          <button class="button new-game">Nuevo juego</button>
          <button class="button join-game">Ingresar a una sala</button>
          <button class="button sign-off">Cerrar sesión</button>
      </div>
      <button class="button consult-room">Gamerooms Creadas</button>

      <div class="template__results">
        <div class="button__container">
            <button class="closeButton">X</button>
        </div>
        <div class="template__container">
      </div> 
        <template class="template__gamerooms">
              <div class="gameroom__container-contrincants">
                <h3 class="h3 playerone__name">Jugador 1</h3>
                <span class="score playerone__score">0</span>

                <span class="h3 span">VS</span>

                <span class="score playertwo__score">0</span>
                <h3 class="h3 playertwo__name">Jugador 2</h3>

              </div>
              <div class="shortRoomID">
                  <h2 class="shortRoomID__id">12345</h2>
              </div>
        </template>
      `;
      this.shadow.appendChild(style);
    }
  }
);

// ARREGLAR QUE SE SUMAN DEVUELTA LOS TEMPLATES AL SALIR Y ENTRAR
// COPIAR SHORTROOMID AL CLICKEARLO.
// POSTMAN DOCUMENTACION
// ENTREGAR
