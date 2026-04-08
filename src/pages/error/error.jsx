import { NavLink } from "react-router-dom"

function Error() {
    return (
        <main className="main bg-dark error-main">
            <section className="error-block">
                <h1 className="error-404">Error 404</h1>
                <h2 className="error-text">Sorry, we can't find the page you're looking for.</h2>
                <NavLink className="" to="/">
                    <button className="error-button">Go back to Home</button>
                </NavLink>
            </section>
        </main>
    )
}

export default Error