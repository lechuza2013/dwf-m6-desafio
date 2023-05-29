/*
guardar información para compartir entre pages/components
guardar en localStorage(lo necesario)
interactuar con localStorage/API
*/
import { Router } from "@vaadin/router";
import { database, onValue, ref, get } from "./db";

export const API_BASE_URL = process.env.PORT || "http://localhost:5000";
const FRONT_URL = "https://piedrapapelotijerazo.onrender.com";
// const FRONT_URL = "http://localhost:1234";
type Jugada = "piedra" | "papel" | "tijeras";

export const state = {
  data: {
    userData: {
      userId: "",
      userName: "",
      userPassword: "",
      userEmail: "",
      rooms: [],
      longRoomId: 0,
      shortRoomId: 0,
    },
    currentGame: {},
  },
  listeners: [],
  init() {
    const localData = localStorage.getItem("ultraSecretGameData") as string;
    const localDataParseado = JSON.parse(localData);
    if (localDataParseado.userId != "") {
      this.setState(localDataParseado);
      Router.go("/menu");
    } else {
      console.log("Inicia sesión primero.");
      Router.go("/");
    }
  },
  getState() {
    return this.data.userData;
  },
  getCurrentGame() {
    return this.data.currentGame;
  },
  setState(newState) {
    this.data.userData = newState;
    for (const cb of this.listeners) {
      cb();
    }
    localStorage.setItem("ultraSecretGameData", JSON.stringify(newState));
    console.log("State actualizado: ", this.data.userData);
  },
  async signIn(userSigninData) {
    let cs = this.getState();
    cs.userEmail = userSigninData.inputEmail;
    cs.userPassword = userSigninData.inputPassword;

    await fetch(API_BASE_URL + "/auth", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: userSigninData.inputEmail,
        password: userSigninData.inputPassword,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.message == "El correo o la contraseña son incorrectos") {
          window.alert(data.message);
        } else {
          console.log("Data recibida del metodo signIn!: ", data);

          cs.userName = data.name;
          cs.userId = data.id;
          cs.rooms = data.rooms;

          console.log("getState: ", this.getState());
          this.setState(cs);
          window.alert("Sesión iniciada!");
          Router.go("/menu");
        }
      });
  },
  async signup(userSignupData) {
    await fetch(API_BASE_URL + "/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: userSignupData.inputEmail,
        name: userSignupData.inputName,
        password: userSignupData.inputPassword,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (
          data.message ==
          "El email ingresado ya fue usado, por favor ingrese otro (Me salió una rima)"
        ) {
          window.alert(data.message);
        } else {
          let cs = this.getState();

          cs.userEmail = userSignupData.inputEmail;
          cs.userPassword = userSignupData.inputPassword;
          cs.userName = userSignupData.inputName;

          cs.userId = data.id;

          console.log("getState: ", this.getState());
          this.setState(cs);
          window.alert("Cuenta creada!");
          Router.go("/menu");
        }
      });
  },
  async askRTDBroom(shortRoomIdReceived) {
    console.log("askRTDBRoom Recibió: ", shortRoomIdReceived);
    await fetch(API_BASE_URL + "/getRoomId/" + shortRoomIdReceived, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.message) {
          window.alert(data.message);
        } else if (data.rtdbRoomid) {
          let cs = this.getState();
          console.log("currentState: ", this.getState());
          cs.shortRoomId = shortRoomIdReceived;
          cs.longRoomId = data.rtdbRoomid;

          this.setState(cs);
          // window.alert("Sala encontrada!");
          this.joinRoom({
            longRoomId: data.rtdbRoomid,
            userId: this.data.userData.userId,
            userName: this.data.userData.userName,
          });
        }
      });
  },
  async joinRoom(dataRecieved) {
    console.log("joinRoom recibió: ", dataRecieved);
    await fetch(
      API_BASE_URL +
        "/joinroom/" +
        dataRecieved.longRoomId +
        "/" +
        dataRecieved.userId,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          userStatus: true,
          userName: dataRecieved.userName,
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (
          data.message == "Te has unido a la sala!" ||
          data.message == "Te has conectado a la sala!"
        ) {
          window.alert(data.message);
          this.connectToGameroom(dataRecieved.longRoomId);
        } else if (
          data.message ===
          "Sala llena, o tu nombre no coincide con los participantes"
        ) {
          // location.reload();
          window.alert(data.message);
        }
      });
  },
  async createRoom(userId, userName) {
    console.log("createRoom Recibió: ", userId);
    await fetch(API_BASE_URL + "/createRoom", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        userId: userId,
        userName: userName,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let cs = this.getState();
        (cs.shortRoomId = data.shortId), (cs.longRoomId = data.longRoomId);
        this.setState(cs);
        window.alert("Sala creada!");
        Router.go("/newgame");
      });
  },
  async connectToGameroom(roomLongId) {
    const roomRef = ref(database, "/rooms/" + roomLongId);
    await onValue(roomRef, (snap) => {
      const data = snap.val();

      console.log(data);
      this.data.currentGame = data.currentGame;
      if (window.location.href == FRONT_URL + "/joingame") {
        Router.go("/play");
      }
      //Si ambos estan online (Ingresaron a la sala)
      if (
        data.currentGame[Object.keys(data.currentGame)[0]].online == true &&
        data.currentGame[Object.keys(data.currentGame)[1]].online == true
      ) {
        if (window.location.href == FRONT_URL + "/newgame") {
          this.data.currentGame = data.currentGame;
          Router.go("/play");
        }
      } else {
        window.alert("Esperando a que el contrincante se conecte");
      }
      if (
        data.currentGame[Object.keys(data.currentGame)[0]].start == true &&
        data.currentGame[Object.keys(data.currentGame)[1]].start == true
      ) {
        if (window.location.href == FRONT_URL + "/play") {
          this.data.currentGame = data.currentGame;
          Router.go("/duel");
        }
        // state.restartRound();
      }
    });
  },
  async checkPlayersReady(roomLongId) {
    //Recibe roomLongId, escucha con onValue la Room, y detecta cuando los dos le den start,
    // Cuando los dos le den ¡Jugar!, setea el 'start' en true, y el online en 'false'
    await fetch(
      API_BASE_URL +
        "/gameRoom/" +
        roomLongId +
        "/start/" +
        this.data.userData.userId,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
      }
    );
  },
  async sendChoice(choice: Jugada) {
    console.log("sendChoice recibió: ", choice);
    await fetch(API_BASE_URL + "/sendChoice", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        roomId: this.data.userData.longRoomId,
        userId: this.data.userData.userId,
        choice: choice,
      }),
    });
  },
  whoWins(localPlayerPlay: string, contrincantPlay: string) {
    // Devuelven booleanos
    const ganaTijeras =
      localPlayerPlay == "tijeras" && contrincantPlay == "papel";
    const ganaPapel = localPlayerPlay == "papel" && contrincantPlay == "piedra";
    const ganaPiedra =
      localPlayerPlay == "piedra" && contrincantPlay == "tijeras";

    const victory = [ganaPapel, ganaPiedra, ganaTijeras].includes(true);

    if (localPlayerPlay == contrincantPlay) {
      return "Empate";
    } else {
      this.addVictory();
      return victory;
    }
  },
  async addVictory() {
    await fetch(API_BASE_URL + "/addPoint", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        roomId: this.data.userData.longRoomId,
        userId: this.data.userData.userId,
      }),
    });
  },
  async restartRound() {
    console.log("restartRound!");
    await fetch(
      API_BASE_URL + "/gameRoom/" + this.data.userData.longRoomId + "/restart",
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
      }
    );
  },
};
