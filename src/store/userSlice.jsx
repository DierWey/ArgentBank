import { createSlice } from '@reduxjs/toolkit'

const initialState = {
		token: null,
		firstName: null,
        userName: null,
}

/* createSlice permet de se passer de createAction. 
Cette fonction génère automatiquement des reducers, des actions et des action creators 
en se basant sur un objet définissant l'état initial et les fonctions réductrices.
Elle doit donc être composée :
    - d'un nom qui identifie la slice (ici : "user")
    - d'une valeur pour l'initialState (ici la constante initialState déclarée plus haut)
    - un ou plusieurs reducers pour savoir comment le state peut être mis à jour */
    
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        /* reducer : fonction qui prend en parametres un etat et une action.
        /* gestion 'automatique' de l'immutabilité : à indiquer en commentaire */

        /* Récupération du token */
        setToken: (state, action)=>{state.token = action.payload},

        // récupération du first name de l'utilisateur
        // Non ! Récupération des informations de l'utilisteur, soit le firstName ET le userName !
        // Donc, ajouter ligne 31 ?
        setFirstName: (state, action)=>{state.firstName = action.payload},

        setUserName: (state, action)=>{state.userName = action.payload},
        
        /* changer le UserName */
        updateUserName: (state, action)=>{state.userName = action.payload},
    },
})

export const { setToken, setFirstName, setUserName, updateUserName } = userSlice.actions
export default userSlice.reducer