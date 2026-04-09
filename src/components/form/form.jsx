import {useState} from "react"
import { useNavigate } from "react-router-dom"
import { setToken, setFirstName, setUserName } from "../../store/userSlice.jsx"
import { useDispatch } from "react-redux"

function Form() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    /* Setters pour les onChange() (champs controlés) */
    const [email, setEmail] = useState("tony@stark.com")
    const [password, setPassword] = useState("password123")    
    /* Setter pour rendre visible le message d'erreur de saisie dans le formulaire */
    const [isVisible, setIsVisible] = useState(false)
    
    /* Test API */
    const urlApi = "http://localhost:3001/api/v1";
   	const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`${urlApi}/user/login`, {
            method: 'POST',
            headers: {
                Accept: "application/json, text/plain, */*",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })

        if (response.status !== 200) {
            console.log(response.status)
            console.log("ça ne fonctionne pas")
            // Rendre visible un message d'erreur dans le formulaire
            setIsVisible(true)
        } else {
            // console.log("response.status =", response.status, "API OK")
            const userLogin = await response.json()
            // console.log(userLogin)
            const token = userLogin.body.token
            // console.log(token)
            dispatch(setToken(token))
            
                /* Un nouveau fetch pour récupérer le firstName et le userName
                Relance un appel à l'API user/profile comme suit : */
                const responseProfile = await fetch(`${urlApi}/user/profile`, {
                    method: 'GET',
                    headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                    },
                })
                if (responseProfile.status !== 200) {
                    console.log(responseProfile.status)
                    console.log("ça ne fonctionne pas")
                    // Gestion de l'erreur : voir plus haut (ligne 32)
                } else {
                    const userProfile = await responseProfile.json()
                    // console.log("userProfile: ", userProfile)

                    const firstName = userProfile.body.firstName
                    // console.log("firstName: ", firstName)
                    dispatch(setFirstName(firstName))
                    
                    const userName = userProfile.body.userName
                    // console.log("userName: ", userName)
                    dispatch(setUserName(userName))
                }

            navigate("/user")
        }
	}
    
    return <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input 
                type="text" 
                id="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
        </div>
        <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input 
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </div>
        <div className="input-error" style={{ display: isVisible ? 'block' : 'none' }}>
            The Username or Password is invalid!
        </div>
        <div className="input-remember">
            <input 
                type="checkbox"
                id="remember-me"
                /*checked="rememberMe"
                onChange={(e) => setRememberMe(e.target.checked)}
                */
            />
            <label htmlFor="remember-me">Remember me</label>
        </div>
        <button type="submit" className="sign-in-button">Sign In</button>
    </form>
}

export default Form