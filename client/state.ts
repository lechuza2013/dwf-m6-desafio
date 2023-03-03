/*
guardar información para compartir entre pages/components
guardar en localStorage(lo necesario)
interactuar con localStorage/API
*/
type Jugada = "piedra" | "papel" | "tijeras";

const state = {
    data:{
        userData: {
            userId: "",
            userName: "",
        }
    }
}