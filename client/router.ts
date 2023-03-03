// PAGES
import "./pages/home";
import "./pages/joingame";
import "./pages/name";
import "./pages/oops"

import { Router } from "@vaadin/router";

const router = new Router(document.querySelector(".root"));
router.setRoutes([
    {path: "/", component: "name-comp"}, // Ingresar nombre 
    {path: "/home", component: "home-comp"} 
])

