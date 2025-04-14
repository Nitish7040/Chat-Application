import React, { useContext, useState } from "react";
import "./LeftSideBar.css";
import assets from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../Config/FireBase";
import { AppContext } from "../../Context/AppContext";
import { toast } from "react-toastify";


const LeftSideBar = () => {
  const navigate = useNavigate();
  const { userData, chatData } = useContext(AppContext);
  const [user, setuser] = useState(null);
  const [showsearch, setshowsearch] = useState(false);

  const inputHandler = async (e) => {
    try {
      const input = e.target.value.toLowerCase();
      if (input) {
        setshowsearch(true);
        const userRef = collection(db, "users");
        const q = query(userRef, where("username", "==", input));
        const querySnap = await getDocs(q);

        if (!querySnap.empty && querySnap.docs[0].data().id !== userData.id) {
          let userExist = false ;
          chatData.map((user) => {
            if(user.rID === querySnap.docs[0].data().id){
              userExist = true;
            }
          })
          if(!userExist){
            setuser(querySnap.docs[0].data());
          }
        }
        else {
          setuser(null);
        }
      }else {
        setshowsearch(false);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

// add chat function :-

const addchat = async () => {
  const messagesRef = collection(db ,"messages");
  const chatsRef = collection(db , "chats");
  try {
    const newMessageRef = doc(messagesRef);
    await setDoc(newMessageRef , {
      createAt : serverTimestamp(),
      messages: []
    });

    await updateDoc(doc(chatsRef, user.id),{
      chatsData : arrayUnion({
        messageId : newMessageRef.id,
        lastmessage :" ",
        rID: userData.id,
        updatedAt:Date.now(),
        messageSeen:true
      })
    })



    await updateDoc(doc(chatsRef, userData.id),{
      chatsData : arrayUnion({
        messageId : newMessageRef.id,
        lastmessage :" ",
        rID: user.id,
        updatedAt:Date.now(),
        messageSeen:true
      })
    })


  } catch (error) {
    toast.error(error.message)
    console.error(error)
    
  }

}


// show chat on chat box:----

const setChat = async (item) =>{
  console.log(item);
  
}

  return (
    <div className="ls">
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo} className="logo" alt="" />
          {/* menu option */}
          <div className="menu">
            <img src={assets.menu_icon} alt="" />
            {/* sub-menu option */}
            <div className="sub-menu">
              <p onClick={() => navigate("/profile")}>Edit profile</p>
              <hr />
              <p>Logout</p>
            </div>
          </div>
        </div>
        <div className="ls-search">
          <img src={assets.search_icon} alt="" />
          <input
            onChange={inputHandler}
            type="text"
            placeholder="Search"
            className="search-input"
          />
        </div>
      </div>

      <div className="ls-list">
        {showsearch && user
        ? <div 
        onClick={addchat}
        className="friends add-user">
          <img src={user.avatar} alt="" />
          <p>{user.name} </p> </div>  
           :
          chatData.map((item, index) => (
            <div
            onClick={()=> setChat(item)} key={index} className="friends">
              <img src={item.userData.avatar} alt="" />
              <div>
                <p>{item.userData.name}</p>
              </div>
              <span>{item.lastmessage} </span>
            </div>
          ))  
          }
      </div>
    </div>
  );
};

export default LeftSideBar;
