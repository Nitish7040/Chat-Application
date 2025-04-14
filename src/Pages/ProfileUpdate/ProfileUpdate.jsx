import React, { useContext, useEffect, useState } from 'react'
import './ProfileUpdate.css'
import assets from '../../assets/assets'
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../Config/FireBase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import upload from '../../Lib/Upload';
import { AppContext } from '../../Context/AppContext';

const ProfileUpdate = () => {
  const navigate = useNavigate();

const [image , setImage] = useState(false);
const [name , setname] = useState("");
const [bio , setbio] = useState("");
const [uid , setuid] = useState("");
const [Previmg , setPrevimg] = useState("");
const {setUserdata} = useContext(AppContext);


const Profileupdate = async (event) =>{
  event.preventDefault();
  try {
    if(!Previmg && !image){
      toast.error("upload profile picture");
    }
    const docRef = doc(db,"users",uid);
    if(image){
        const imgUrl = await upload(image);
        setPrevimg(imgUrl);
        await updateDoc(docRef,{
          avatar: imgUrl,
          bio:bio,
          name:name

        })
    }else{
      await updateDoc(docRef,{
        bio:bio,
        name:name
      })
    }
    const snap = await getDoc(docRef);
    setUserdata(snap.data());
    navigate("/chat");

  } catch (error) {
    console.error(error)
    toast.error(error.message);
    
  }

}


useEffect(()=>{
  onAuthStateChanged(auth,async (user)=>{
    if(user){
      setuid(user.uid)
      const docRef = doc(db,"users",user.uid);
      const docSnap= await getDoc(docRef);
      if(docSnap.data().name){
        setname(docSnap.data().name);
    } if(docSnap.data().bio){
      setbio(docSnap.data().bio);
  } if(docSnap.data().avatar){
      setPrevimg(docSnap.data().avatar)
  }
} 
else {
   navigate("/");
}
  })
},[])

  return (
    <div className='profile'>
      <div className="profile-container">
        <form onSubmit={Profileupdate}>
          <h3>Profile Details</h3>
          <label htmlFor="avatar">
            <input onChange={(e)=> setImage(e.target.files[0])} type="file" id='avatar' accept='.png , .jpg , .jpeg' hidden/>
            <img src={image ? URL.createObjectURL(image) : assets.avatar_icon} alt="" />
            Upload Profile Image
          </label>

         <input type="text" onChange={(e)=>setname(e.target.value)} value={name} placeholder='Your name' required />
         <textarea onChange={(e)=>setbio(e.target.value)} value={bio} placeholder='Write profile bio' required></textarea>
         <button type="submit">Save</button>
        </form>
        <img className='profile-pic' src={image ? URL.createObjectURL(image) : Previmg ? Previmg : assets.logo_icon} alt="" />
      </div>
    </div>
  )
}

export default ProfileUpdate