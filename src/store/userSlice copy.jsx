import { createSlice } from '@reduxjs/toolkit'

/* createSlice permet de simplifier la création d'une slice (une partie du state Redux). 
Cette fonction génère automatiquement des reducers, des actions et des action creators 
en se basant sur un objet définissant l'état initial et les fonctions réductrices.
Elle doit donc être composée :
    - d'un nom qui identifie la slice dans le store (ici : "user")
    - d'une valeur pour l'initialState (ici la constante initialState déclarée plus haut)
    - un ou plusieurs reducers pour permettre la mise à jour du state
    - des actions générées automatiquement à partir des reducers */

// Définition de l'état initial
const initialState = {
		token: null,
        userName: null,
}

// Création de la slice    
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setToken: (state, action)=>{state.token = action.payload},
        setUserName: (state, action)=>{state.userName = action.payload},
    },
})

//Export des actions et du reducer
export const { setToken, setUserName } = userSlice.actions
export default userSlice.reducer


        /* setToken est une fonction reducer qui retourne une action au format 
        { type: "user/setToken", payload: "valeur passée à dispatch(setToken(valeur))" } */

        // Quand cette action est dispatchée (useDispatch), elle met à jour l'état
        // Pour lire/accéder à state.user.token, on utilise useSelector
        
        /* La bibliothèque Immer permet d'écrire state.token = action.payload 
        comme si on mutais l’état directement. 
        Mais en Redux classique, l’état doit toujours être immuable : on ne modifie jamais directement 
        un objet ou un tableau, on en crée toujours une nouvelle copie. 
        En fait, Immer crée une copie immutable de l'état avec la nouvelle valeur de token*/