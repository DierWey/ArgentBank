import { NavLink } from "react-router-dom"
import logo from '../../assets/images/argentBankLogo.webp'
import { useSelector, useDispatch } from 'react-redux'
import { setToken, setUserName } from '../../store/userSlice.jsx'

/* 2 cas :
- Si token === null, alors affichage par défaut
- Else : {userName} et "Sign out" après le logo (fa-user-circle)
Au clic sur Sign out, token et userName reviennent à leur initialState, cad null 
Idem au clic sur le logo Argent bank : onClick={signOut} */


function Header() {
    const selector = useSelector
    const token = selector((state) => state.user.token)
    const userName = selector((state) => state.user.userName)
    const dispatch = useDispatch()

    // Supprime le token et userName du store et du local storage
    const signOut = () => {
        dispatch(setToken(null));
        dispatch(setUserName(null));
        localStorage.removeItem('token');
        localStorage.removeItem('userName');
    };

    return (
        <nav className="main-nav">
            <NavLink onClick={signOut} className="main-nav-logo" to="/">
                <img
                    className="main-nav-logo-image"
                    src={logo}
                    alt="Argent Bank Logo"
                />
                <h1 className="sr-only">Argent Bank</h1>
            </NavLink>
            <div>           
                {token === null ? (
                    <>
                        <i className="fa fa-user-circle"></i>
                        <NavLink className="main-nav-item" to="/signin">
                            Sign In
                        </NavLink>
                    </>
                ) : ( 
                    <>
                        <i className="fa fa-user-circle"></i>
                        <span className="main-nav-userName">{userName} </span>
                        <NavLink onClick={signOut} className="main-nav-item" to="/">
                            <i className="fa fa-sign-out"></i>
                            Sign Out
                        </NavLink>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Header