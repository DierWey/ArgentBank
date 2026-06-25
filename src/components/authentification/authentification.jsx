import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setToken, setUserName, setFirstName, setLastName } from "../../store/userSlice.jsx";
import { useDispatch } from "react-redux";

function Authentification() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    /* Setters pour les onChange() (champs controlés) */
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    /* Setter pour rendre visible le message d'erreur de saisie dans le formulaire */
    const [isVisible, setIsVisible] = useState(false);
    /* Setter(s) pour le Remember Me */
    const [rememberMe, setRememberMe] = useState(false);

    /* À l'arrivée sur la page, on vérifie que email est dans le local storage */
    useEffect(() => {
        const storedEmail = localStorage.getItem('storageEmail');
        if (storedEmail) {
            setEmail(storedEmail);
            setRememberMe(true);
        }
    }, []);

    /* Si Remember Me est coché, alors email est stocké dans le local storage */
    useEffect(() => {
        if (rememberMe && email) {
            localStorage.setItem('storageEmail', email);
        } else {
            localStorage.removeItem('storageEmail');
        }
    }, [rememberMe, email]);

    const urlApi = "http://localhost:3001/api/v1";

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Appel à /user/login
            const loginResponse = await fetch(`${urlApi}/user/login`, {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!loginResponse.ok) {
                throw new Error("Invalid credentials");
            }

            const userLogin = await loginResponse.json();
            const token = userLogin.body.token;

            // Appel unique à /user/profile
            const profileResponse = await fetch(`${urlApi}/user/profile`, {
                method: 'GET',
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!profileResponse.ok) {
                throw new Error("Failed to fetch profile");
            }

            const userProfile = await profileResponse.json();
            const { userName, firstName, lastName } = userProfile.body;

            // Mise à jour du localStorage
            if (rememberMe) {
                localStorage.setItem("storageEmail", email);
            }
            localStorage.setItem('token', token);
            localStorage.setItem('userName', userName);

            // Mise à jour du store Redux
            dispatch(setToken(token));
            dispatch(setUserName(userName));
            dispatch(setFirstName(firstName));
            dispatch(setLastName(lastName));

            // Redirection
            navigate("/user");
        } catch (error) {
            console.error(error);
            setIsVisible(true);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
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
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button">Sign In</button>
        </form>
    );
}

export default Authentification;