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
  { path: "/", component: "home-comp" }, // Iniciar sesión/registrarse
  { path: "/signin", component: "signin-comp" },
  { path: "/signup", component: "signup-comp" },
  //Después de iniciar sesión
  { path: "//menu", component: "menu-comp" },
  // { path: "/menu", component: "play-comp" },
  { path: "/joingame", component: "joingame-comp" },
  { path: "/newgame", component: "newgame-comp" },
  { path: "/play", component: "play-comp" },
  { path: "/duel", component: "duel-comp" },
]);
