import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { setToken, setUserName } from "../../store/userSlice.jsx"
import Welcome from "../../components/welcome/welcome"
import Accounts from "../../components/accounts/accounts"

function User() {

// Vérification de la sauvegarde du token dans le local storage

    // déclaration des variables
    const dispatch = useDispatch()
    const selector = useSelector
    const token = selector((state) => state.user.token)
    const navigate = useNavigate()
    
    // Use Effect avec le token, dispatch et navigate en dépendances
    useEffect(() => {    
        const storedToken = localStorage.getItem('token');
        const storedUserName = localStorage.getItem('userName');

        // Si le token n'existe pas dans le store Redux, mais existe dans le local storage
        if (!token && storedToken) {
            // Recharge de token et userName dans le store
            dispatch(setToken(storedToken));
            dispatch(setUserName(storedUserName));
        // Sinon, si le token n'existe ni dans le store, ni dans le local storage
        } else if (!token && !storedToken) {
            // Redirige vers la page d'accueil
            navigate("/");
        }
    }, [token, dispatch, navigate]);

    // Tant que le token n'est pas chargé ou valide, n'affiche pas la page
    if (!token) {
        return null; // Ou un loader ?
    }

//Si le token n'est pas null, alors afichage de la page
    return (
        <main className="main bg-dark">
            <Welcome />
            <Accounts />
        </main>
    )

}

export default User