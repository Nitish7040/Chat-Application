import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../Config/FireBase";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

const AppContextProvider = (props)=>{

    const navigate = useNavigate();
    const [userData, setUserdata] = useState(null);
    const [chatData, setchatdata] = useState([]);

const loadUserdata = async (uid) =>{
    try {
        const userRef = doc(db,"users",uid);
        const userSnap = await getDoc(userRef);
        const userData = userSnap.data();
        setUserdata(userData);

        if (userData.avatar && userData.name) {
            navigate("/chat");
        }else{
            navigate("/profile")
        }
        await updateDoc(userRef,{
            lastSeen:Date.now()
        })

        setInterval(async () => {
            if(auth.chatuser){
                await updateDoc(userRef,{
                    lastSeen:Date.now()
                })

            }
        }, 60000);
        
    } catch (error) {
        console.error(error.code)
    }

   
}

 // add chat data
 useEffect(() => {
    if (userData) {
      const chatRef = doc(db, "chats", userData.id);
  
      const unSub = onSnapshot(chatRef, async (res) => {
        const data = res.data();
        const chatItems = data?.chatData;
  
        if (!chatItems || !Array.isArray(chatItems)) {
          setchatdata([]); // Set to empty if no data
          return;
        }
  
        const tempData = [];
        for (const item of chatItems) {
          try {
            const userRef = doc(db, 'users', item.rID);
            const userSnap = await getDoc(userRef);
            const userData = userSnap.data();
            tempData.push({ ...item, userData });
          } catch (err) {
            console.error("Error fetching user data for chat item:", item.rID, err);
          }
        }
  
        setchatdata(tempData.sort((a, b) => b.updatedAt - a.updatedAt));
      });
  
      return () => {
        unSub();
      };
    }
  }, [userData]);
  


    const value ={
        userData,setUserdata,
        chatData,setchatdata,
        loadUserdata

    }



    return (
        <AppContext.Provider value={value}>
             {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider ;