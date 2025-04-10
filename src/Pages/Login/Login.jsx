import React ,{useState} from 'react'
import './Login.css'
import assets from '../../assets/assets'
const Login = () => {

const [CurrState, setCurrState] = useState('Sign up');

  return (
<>

<div className="login">
    <img className="logo" 
         src={assets.logo_big} alt="" />

<form action="" className="login-form">
    <h2>{CurrState}</h2>

   {CurrState === "Sign up" ? <input type="text" className="form-input" placeholder='Username' required /> : null} 
    <input type="Email" className="form-input" placeholder='Email' required />
    <input type="Password" className="form-input" placeholder='Password' required />

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