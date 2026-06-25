import {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { setToken, setUserName, setFirstName, setLastName } from "../../store/userSlice.jsx"
import { useDispatch } from "react-redux"

function Authentification() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    /* Setters pour les onChange() (champs controlés) */
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")    
    /* Setter pour rendre visible le message d'erreur de saisie dans le formulaire */
    const [isVisible, setIsVisible] = useState(false)
    /* ** Setter(s) pour le Remember Me ** */
    const [rememberMe, setRememberMe] = useState(false)
            
    /* A l'arrivé sur la page, on vérifie que email est dans le local storage. Si c'est le cas, 
    alors email est placé automatiquement dans la valeur de l'input Username (cf. ligne 108),
    Et Remember Me est affiché coché */
    useEffect(() => {
        const storedEmail = localStorage.getItem('storageEmail')
        if (storedEmail) {
            setEmail(storedEmail)
            setRememberMe(true)
        }
    }, [])

    /* Si Remember Me est coché, alors email est stocké dans le local storage
       Sinon, local storage est purgé */
    useEffect(() => {
        if (rememberMe) {
            localStorage.setItem('storageEmail', email)
        } else {
            localStorage.removeItem('storageEmail')
        }
    }, [rememberMe, email])
        
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
        // Si la requête a échoué
        if (response.status !== 200) {
            console.log(response.status)
            console.log("ça ne fonctionne pas")
            // Rendre visible un message d'erreur dans le formulaire
            setIsVisible(true)
        // Sinon (si la requête a réussi)
        } else {
            const userLogin = await response.json()
            const token = userLogin.body.token
            // Sauvegarde du token dans le local storage
            localStorage.setItem('token', token);

            const responseGet = await fetch(`${urlApi}/user/profile`, {
                    method: 'GET',
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
                if (responseGet.status === 200) {
                    const userProfile = await responseGet.json();
                    const userName = userProfile.body.userName;
                    localStorage.setItem('userName', userName);
                }

            // Si "Remember Me" est coché, sauvegarde de l'email dans le local storage
            if (rememberMe) {
                localStorage.setItem("storageEmail", email)                
            }

            // Mise à jour du token dans le store
            dispatch(setToken(token));

            // Mise à jour du userName, du firstName et du lastName dans le store
            const responseGetUser = await fetch(`${urlApi}/user/profile`, {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            })
            if (responseGetUser.status === 200) {
                const userProfile = await responseGetUser.json();
                const userName = userProfile.body.userName;
                dispatch(setUserName(userName));
                const firstName = userProfile.body.firstName;
                dispatch(setFirstName(firstName));
                const lastName = userProfile.body.lastName;
                dispatch(setLastName(lastName));
            }

            navigate("/user");
        }
    }
    
    return <form onSubmit={handleSubmit}>
        <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            {/* Champ contrôlé. Quand sa valeur change, l'état de email est mis à jour*/}
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
            {/* Champ contrôlé. Quand sa valeur change, l'état de password est mis à jour*/}
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
            {/* Champ contrôlé. Quand la case à coché est cliquée, 
            l'état de rememberMe change (true ou false)*/}
            <input 
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
        </div>
        <button type="submit" className="sign-in-button">Sign In</button>
    </form>
}

export default Authentification