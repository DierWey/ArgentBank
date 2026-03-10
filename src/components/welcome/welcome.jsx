const userName = "Tony Jarvis";

function Welcome() {
    return (
      <div class="header">
        <h1>Welcome back
            <br />{userName}!
        </h1>
        <button class="edit-button">Edit Name</button>
      </div>
    )
}

export default Welcome;