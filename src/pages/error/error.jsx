import { NavLink } from "react-router-dom"

function Error() {
    return (
        <>
            <h1 className="">Error 404</h1>
            <h2 className="">Sorry, we can't find the page you're looking for.</h2>
            <NavLink className="" to="/">
                <button>Go back to Home</button>
            </NavLink>
        </>
    )
}

export default Error