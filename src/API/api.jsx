/* URL de l'API */
const urlApi = "http://localhost:3001/api/v1";

/* Authentification de l'utilisateur */
export async function FetchLogin(props) {
    const response = await fetch(`${urlApi}/user/login`, {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: props.email,
            password: props.password,
        }),
    });
    return await response.json();
}