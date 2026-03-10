import Welcome from "../../components/welcome/welcome";
import Accounts from "../../components/accounts/accounts";

function User() {
    return (
        <main className="main bg-dark">
            <Welcome />
            <Accounts />
        </main>
    )
}

export default User