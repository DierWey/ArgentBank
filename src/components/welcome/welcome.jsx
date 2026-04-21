import {useState} from "react"
import { useSelector, useDispatch } from 'react-redux'
import { updateUserName } from "../../store/userSlice.jsx"

function Welcome() {
    
  // Setters
  const [showModal, setShowModal] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [newUserName, setNewUserName] = useState("")

  // Adresse de l'API
  const urlApi = "http://localhost:3001/api/v1";

  // Préparation des Selectors et du Dispatch
  const token = useSelector((state) => state.user.token)
  const userName = useSelector((state) => state.user.userName)
  const dispatch = useDispatch()
 
  // (Au clic sur "Edit name") fait apparaitre la modal
  const openModal = () => setShowModal(true)
  // (Au clic sur "Cancel") ferme la modal
  const closeModal = () => setShowModal(false)
  
  // (Au clic sur "Confirm") modification du userName dans la BD
  const changeUserName = async (e) => {
    e.preventDefault()
    const responsePut = await fetch(`${urlApi}/user/profile`, {
      method: 'PUT',
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName: newUserName }),
    })

    if (newUserName !== "") {
      // Mettre à jour le userName dans le store
      console.log("Input n'est pas vide")
      const userProfile = await responsePut.json()
      console.log("userProfile: ", userProfile)              
      const userName = userProfile.body.userName
      console.log("userName: ", userName)
      dispatch(updateUserName(userName))
      //Fermer la modale
      setShowModal(false)
    } else {
      // console.log("Input est vide")
      setShowMessage(true)
    }  
  }
  

  return (
    <>
      <article style={{ display: showModal ? 'block' : 'none' }}>
        <div className="newUserName-modal">
          <div className="newUserName-form">
            <div className="newUserName-label">New name:</div>
            <input 
                type="text"
                className="newUserName-input"
                id="newUserName"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
            />
            <div className="input-error" style={{ display: showMessage ? 'block' : 'none' }}>
              A new name is required!
            </div>
            <div className="btn-container">
              <button onClick={changeUserName} className="btn-newUserName">Confirm</button>
              <button onClick={closeModal} className="btn-newUserName">Cancel</button>
            </div>
          </div>
        </div>
      </article>

      <div className="header">
        <h1>Welcome back
            <br />{userName}!
        </h1>
        <button onClick={openModal} className="edit-button">Edit Name</button>
      </div>
    </>
  )
}

export default Welcome;