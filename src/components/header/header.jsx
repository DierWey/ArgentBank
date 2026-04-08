import { NavLink } from "react-router-dom"
import logo from '../../assets/images/argentBankLogo.webp'
import { useSelector, useDispatch } from 'react-redux'

/* Avoir 2 cas :
- Si token === null, alors affichage par défaut
- Else : {firstName} et "Sign out" après le logo (fa-user-circle)
Au clic sur Sign out, token revient à son initialState, cad null 
Idem au clic sur le logo Argent bank : onClick={signOut}

Quelle est la durée de vie du Store ? La session ?
Est-ce qu'on doit afficher le firstName ou le userName après le logo ?
Si c'est userName, alors l'update du userName modifie le header, et firstName n'est pas necessaire
dans userSlice.jsx et form.jsx. */

function Header() {
    const selector = useSelector
    const token = selector((state) => state.user.token)
    const firstName = selector((state) => state.user.firstName)
    const dispatch = useDispatch
    const signOut = () => {dispatch(setToken(null))}

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
                {token === null ?
                    <NavLink className="main-nav-item" to="/signin">
                    <i className="fa fa-user-circle"></i>
                    <span>{firstName}</span>
                    Sign In
                    </NavLink>
                    : 
                    <NavLink onClick={signOut} className="main-nav-item" to="/">
                    <i className="fa fa-user-circle"></i>
                    <span className="main-nav-firstName">{firstName} </span>
                    <i className="fa fa-sign-out"></i>
                    Sign Out
                    </NavLink>
                }
            </div>
        </nav>
    )
}

export default Header