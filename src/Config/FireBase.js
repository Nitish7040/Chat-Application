// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBJM21fS8arsDGtQ2dvFIsQqU5Zd2eyc6U",
  authDomain: "chat-app-js-30220.firebaseapp.com",
  projectId: "chat-app-js-30220",
  storageBucket: "chat-app-js-30220.firebasestorage.app",
  messagingSenderId: "895830232471",
  appId: "1:895830232471:web:0eed2ac8b17133f21fc8d2",
  measurementId: "G-9Y0L53XS4K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db= getFirestore(app);

// signup functionality :---

const Signup = async (username , email , password) =>{
      try {
        const response = await createUserWithEmailAndPassword(auth , email , password);
        const user = response.user;

//  this two collections will create when user signup :-
        await setDoc(doc(db,"users", user.uid),{
            id:user.uid,
            username:username.toLowerCase(),
            email,
            name:"",
            avatar:"",
            bio:"hey there",
            lastSeen: Date.now()
        })

        await setDoc(doc(db,"chats", user.uid),{
            chatdata:[]
        })
      } catch (error) {
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));
      }
}

// login functionality :--

const login = async (email , password) => {
    try {
        await signInWithEmailAndPassword(auth , email , password);
    } catch (error) {
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }

}

//logout functionality :---

const logout = async () =>{
    try {
         await signOut(auth)
    } catch (error) {
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}


export  {Signup , login , logout , auth , db }
