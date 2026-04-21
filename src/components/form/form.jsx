import {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { setToken, setFirstName, setUserName } from "../../store/userSlice.jsx"
import { useDispatch } from "react-redux"


// *** Remember Me *** //
/*

Rappel useEffect

useEffect(()=>{
    
}, [])

- On lui passe un premier parametre (le call-back) qui sera executé dés lors
qu'une dépendance change.
- En second parametre : un tableau de dépendances (variables)
- Si une variable (dépendance) a changé depuis le dernier rendu, alors le call-back 
est automatiquement appelé

*/


function Form() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    /* Setters pour les onChange() (champs controlés) */
    const [email, setEmail] = useState("tony@stark.com")
    const [password, setPassword] = useState("password123")    
    /* Setter pour rendre visible le message d'erreur de saisie dans le formulaire */
    const [isVisible, setIsVisible] = useState(false)
    /* ** Setter(s) pour le Remember Me ** */
    const [rememberMe, setRememberMe] = useState(false)
    
    /* Appel à l'API user/login permettant de récupérer (dans le store) le token */
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
            
                /* Appel à l'API user/profile (method GET) afin de stocker (dans le store)
                le firstName et le userName */
                const responseGet = await fetch(`${urlApi}/user/profile`, {
                    method: 'GET',
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
                if (responseGet.status !== 200) {
                    console.log(responseGet.status)
                    console.log("ça ne fonctionne pas")
                    // Gestion de l'erreur
                } else {
                    const userProfile = await responseGet.json()
                    // console.log("userProfile: ", userProfile)
                    const firstName = userProfile.body.firstName
                    // console.log("firstName: ", firstName)
                    dispatch(setFirstName(firstName))                    
                    const userName = userProfile.body.userName
                    // console.log("userName: ", userName)
                    dispatch(setUserName(userName))
                }
            
            if (rememberMe) {
                localStorage.setItem("username", email);
                // localStorage.setItem("password", password); NON, par sécurité
                localStorage.setItem("rememberMe", true);
                console.log("local storage email", localStorage.username)
            } else {
                localStorage.removeItem("username");
                // localStorage.removeItem("password"); voir ligne 90
                localStorage.removeItem("rememberMe");
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
                /* remember me */
                // checked="rememberMe"
                // onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
        </div>
        <button type="submit" className="sign-in-button">Sign In</button>
    </form>
}

export default Form