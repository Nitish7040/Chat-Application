import { doc, getDoc, updateDoc } from "firebase/firestore";
import { createContext, useState } from "react";
import { auth, db } from "../Config/FireBase";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

const AppContextProvider = (props)=>{

    const navigate = useNavigate();
    const [userData, setUserdata] = useState(null);
    const [chatData, setchatdata] = useState(null);

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