import { configureStore } from "@reduxjs/toolkit";

const initialState = {
		token: null,
		logged: false,
        error: null,        
}

const reducer = (initialState, action) => {

}

const store = configureStore(
    {
        preloadedState: initialState,
        reducer
    }
)

export default store;