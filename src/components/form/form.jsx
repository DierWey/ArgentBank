import {useState} from "react"
import { useNavigate } from "react-router-dom";

function Form() {
    const navigate = useNavigate()
    /* Setters pour les onChange() (champs controlés) */
    const [email, setEmail] = useState("tony@stark.com")
    const [password, setPassword] = useState("password123")
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
        } else {
            console.log(response.status)
            console.log("ça fonctionne")
            const userLogin = await response.json()
            console.log(userLogin)
            const token = await userLogin.body.token
            console.log(token)
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