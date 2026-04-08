import { useSelector, useDispatch } from 'react-redux'

// Utiliser prompt() plutôt qu'une modal ?
/* Au click :
const changeUserName() {
  let newUserName = prompt("Please enter your name")
  if (newUserName != null) {
    - appel à l'API user/profile method PUT pour changer le userName dans la BdD
    - appel à l'API user/profile method GET pour mettre à jour le userName dans le store avec un
    dispatch(updateUserName(userName))
}
*/

function Welcome() {

const selector = useSelector
const token = selector((state) => state.user.token)
const userName = selector((state) => state.user.userName)
const dispatch = useDispatch
 

    return (
      <div className="header">
        <h1>Welcome back
            <br />{userName}!
        </h1>
        <button className="edit-button">Edit Name</button>
        { /* <button onClick={changeUserName} className="edit-button">Edit Name</button> */ }
      </div>
    )
}

export default Welcome;