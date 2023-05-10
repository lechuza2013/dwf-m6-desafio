import { Router } from "@vaadin/router";
import "./router";
import { state } from "./state";

(function main() {
  Router.go("/");
  console.log("Index.ts");
  state.init();
})();
