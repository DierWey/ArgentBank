import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken, setUserName, setFirstName, setLastName } from "../../store/userSlice.jsx";
import Welcome from "../../components/welcome/welcome";
import Accounts from "../../components/accounts/accounts";

function User() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.user.token);
    const [isLoading, setIsLoading] = useState(true);
    const [isTokenValid, setIsTokenValid] = useState(false);

    const urlApi = "http://localhost:3001/api/v1";

    useEffect(() => {
        const checkTokenValidity = async () => {
            const storedToken = localStorage.getItem('token');
            const storedUserName = localStorage.getItem('userName');

            // Si le token n'existe pas dans le store Redux, mais existe dans le local storage
            if (!token && storedToken && storedUserName) {
                dispatch(setToken(storedToken));
                dispatch(setUserName(storedUserName));
            }

            // Vérifier la validité du token avec /user/profile
            if (storedToken) {
                try {
                    const response = await fetch(`${urlApi}/user/profile`, {
                        method: 'GET',
                        headers: {
                            Accept: "application/json",
                            Authorization: `Bearer ${storedToken}`,
                        },
                    });

                    if (response.ok) {
                        const userProfile = await response.json();
                        const { userName, firstName, lastName } = userProfile.body;

                        // Mise à jour du store avec les données du profil
                        dispatch(setUserName(userName));
                        dispatch(setFirstName(firstName));
                        dispatch(setLastName(lastName));

                        setIsTokenValid(true);
                    } else {
                        // Token invalide ou expiré
                        localStorage.removeItem('token');
                        localStorage.removeItem('userName');
                        setIsTokenValid(false);
                        navigate("/");
                    }
                } catch (error) {
                    console.error("Erreur lors de la vérification du token :", error);
                    localStorage.removeItem('token');
                    localStorage.removeItem('userName');
                    setIsTokenValid(false);
                    navigate("/");
                }
            } else {
                // Pas de token dans le local storage
                setIsTokenValid(false);
                navigate("/");
            }

            setIsLoading(false);
        };

        checkTokenValidity();
    }, [token, navigate, dispatch]);

    // Tant que le token n'est pas vérifié, affiche un loader
    if (isLoading) {
        return <div>Vérification du token en cours...</div>;
    }

    // Si le token n'est pas valide, ne pas afficher la page
    if (!isTokenValid) {
        return null;
    }

    // Si le token est valide, affiche la page
    return (
        <main className="main bg-dark">
            <Welcome />
            <Accounts />
        </main>
    );
}

export default User;