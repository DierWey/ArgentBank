import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { setToken } from "../../store/userSlice.jsx"
import Welcome from "../../components/welcome/welcome"
import Accounts from "../../components/accounts/accounts"

function User() {

// Vérification de la nullité du token 
    // déclaration des variables
    const selector = useSelector
    const token = selector((state) => state.user.token)
    const navigate = useNavigate()
    // Use Effect avec le token en dépendance
    useEffect(()=>{
        // Si token dans le store est null, alors renvoi vers la page /signin
        if (token === null) {
            navigate("/signin")
        } 
    }, [token])

//Si le token n'est pas null, alors afichage de la page
    return (
        <main className="main bg-dark">
            <Welcome />
            <Accounts />
        </main>
    )

}

export default User