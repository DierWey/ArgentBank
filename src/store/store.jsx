import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

//Création du Store avec une slice (user: userReducer)
const store = configureStore({
    reducer: {
        user: userReducer
    },
});

export default store