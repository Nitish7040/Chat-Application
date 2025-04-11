import React ,{useState} from 'react'
import './Login.css'
import assets from '../../assets/assets'
import { Signup , login} from '../../Config/FireBase'


const Login = () => {

const [CurrState, setCurrState] = useState('Sign up');
const [username, setUsername] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const onsubmitHandler = async (event) => {
  event.preventDefault();  
    if (CurrState === "Sign up") {
        await Signup(username, email, password);
    } 
    else {
        // Handle login logic here
       login(email, password)
    } 
}

  return (
<>

<div className="login">
    <img className="logo" 
         src={assets.logo_big} alt="" />

<form onSubmit={onsubmitHandler} className="login-form">
    <h2>{CurrState}</h2>

   {CurrState === "Sign up" ? <input onChange={(e) =>setUsername(e.target.value)} value={username} type="text" className="form-input" placeholder='Username' required /> : null} 

    <input type="Email" onChange={(e) =>setEmail(e.target.value)} value={email} className="form-input" placeholder='Email' required />

    <input type="Password" onChange={(e) =>setPassword(e.target.value)} value={password} className="form-input" placeholder='Password' required />

    <button type='submit'>{CurrState === "Sign up" ? "Create account" :"Login now"}</button>
<div className="login-term">
    <input type="checkbox" />
    <p>Agree for terms.</p>
</div>
<div className="login-forgot">
    {
        CurrState === "Sign up"
        ?   <p className='login-toggle'>Already have an account <span onClick={()=>setCurrState("Login")}>Login here</span></p>
        : <p className='login-toggle'>Create an account <span onClick={()=>setCurrState("Sign up")}>click here</span></p>
    }
   
    
</div>
</form>


</div>


</>
  )
}

export default Login