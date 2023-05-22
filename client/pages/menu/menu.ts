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
    showGameRooms(roomsData) {
      console.log("showGameRooms recibió: ", roomsData);
      const contenedorEl = this.shadow.querySelector(".template__results");
      const template = this.shadow.querySelector(".template__gamerooms");
      if (roomsData.message) {
        window.alert(roomsData.message);
      } else {
        roomsData.forEach((r) => {
          // Players
          const playerOneNameEl = this.shadow.querySelector(".playerone__name");
          const playerTwoNameEl = this.shadow.querySelector(".playertwo__name");
          playerOneNameEl.textContent = r.playerOneName;
          playerTwoNameEl.textContent = r.playerTwoName;
          // Scores
          const playerOneScoreEl =
            this.shadow.querySelector(".playerone__score");
          const playerTwoScoreEl =
            this.shadow.querySelector(".playertwo__score");
          playerOneScoreEl.textContent = r.playerOneScore;
          playerTwoScoreEl.textContent = r.playerTwoScore;

          // Short Room ID
          const shortRoomIdEl = this.shadow.querySelector(".shortRoomID");
          shortRoomIdEl.textContent = r.shortRoomID;
          const clone = document.importNode(template, true);
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
       `;
      this.shadow.innerHTML = `
      <maintitle-el>Piedra Papel o Tijera</maintitle-el>
       <div class="button-containers">
          <button class="button new-game">Nuevo juego</button>
          <button class="button join-game">Ingresar a una sala</button>
          <button class="button sign-off">Cerrar sesión</button>
      </div>
      <button class="button consult-room">Gamerooms Creadas</button>

      <div class="template__results"></div>

      <template class="template__gamerooms">
      <div class="button__container"> <button class="closeButton">X</button></div>
          <div class="gameroom__container">

            <div class="gameroom__container-contrincants">
              <h3 class="h3 playerone__name">Jugador 1</h3>
              <span class="score playerone__score">0</span>

              <span class="h3">VS</span>

              <span class="score playertwo__score">0</span>
              <h3 class="h3 playertwo__name">Jugador 2</h3>

            </div>
            <div class="shortRoomID">
                <h2>12345</h2>
            </div>
          </div>
      </template>
      `;
      this.shadow.appendChild(style);
    }
  }
);
