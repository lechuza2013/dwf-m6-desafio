import {Router} from "@vaadin/router"
import "./router";

(function main(){
    Router.go("/");
    console.log("Index.ts")
    console.log(process.env.FIREBASE_PROJECT_ID);
})();