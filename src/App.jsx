import React, { useContext, useEffect } from 'react'
import { Routes , Route, useNavigate} from 'react-router-dom'
import Login from './Pages/Login/Login'
import Chat  from './Pages/Chat/Chat'
import ProfileUpdate  from './Pages/ProfileUpdate/ProfileUpdate'

import { ToastContainer, toast } from 'react-toastify';
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './Config/FireBase'
import { AppContext } from './Context/AppContext'

const App = () => {
  const navigate = useNavigate();
  const { loadUserdata} = useContext(AppContext);

useEffect(() => {
    onAuthStateChanged(auth, async (user)=>{
      if (user) {
        navigate("/chat");
        // console.log(user);
        await loadUserdata(user.uid)
        
      } else {
        navigate("/");
      }

    })
}, [])

  return (
    <>
    <ToastContainer/>
     <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/profile" element={<ProfileUpdate />} />
     
     </Routes>
    
    </>
  )
}

export default App