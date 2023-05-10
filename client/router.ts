// PAGES
import "./pages/home";
import "./pages/signin";
import "./pages/signup";
import "./pages/menu/menu";
import "./pages/menu/join";
import "./pages/menu/newgame";
import "./pages/menu/game/play";
import "./pages/menu/game/duel";
import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
  { path: "/dwf-m6-desafio/", component: "home-comp" }, // Iniciar sesión/registrarse
  { path: "/dwf-m6-desafio/signin", component: "signin-comp" },
  { path: "/dwf-m6-desafio/signup", component: "signup-comp" },
  //Después de iniciar sesión
  { path: "/dwf-m6-desafio//menu", component: "menu-comp" },
  // { path: "/dwf-m6-desafio/menu", component: "play-comp" },
  { path: "/dwf-m6-desafio/joingame", component: "joingame-comp" },
  { path: "/dwf-m6-desafio/newgame", component: "newgame-comp" },
  { path: "/dwf-m6-desafio/play", component: "play-comp" },
  { path: "/dwf-m6-desafio/duel", component: "duel-comp" },
]);
