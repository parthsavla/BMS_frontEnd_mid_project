import '../css/App.css';
import Home from '../pages/Home'
import { auth} from "../pages/Firebase";
import { signInWithEmailAndPassword} from "firebase/auth";
import React, { useEffect, useState } from "react";

import {
  Link
} from "react-router-dom";
function SignIn() {
  const emailRef = React.useRef(null)
  const passwordRef =React.useRef(null)
  const [authentication,setAuthentication] = useState(false || window.localStorage.getItem('authentication' )==="true")
  const [token,setToken] = useState(null)

  useEffect(()=>{
      auth.onAuthStateChanged((userCred)=>{
          if(userCred){
              setAuthentication(true)
              console.log('user after login in', authentication)
              window.localStorage.setItem('authentication','true')
              userCred.getIdToken().then(token=>{
                  setToken(token)
                  console.log('user token', token)
              })
          }
      })
  })

  const  signIn = (e)=>{
    e.preventDefault();
    signInWithEmailAndPassword(auth,emailRef.current.value, passwordRef.current.value)
        .then(userCred => {
          const user = userCred.user
          if(user){
              setAuthentication(true)
              console.log('user after logged in', authentication)
          }
        })
            .catch(err => {
              
              console.log(err)
              if(err.code === "auth/wrong-password"){
                alert('incorrect password')
              }else if("auth/user-not-found"){
                alert('User Not Found')
              }
            
            })
            
        }
    


  return (
    
    <div>
      <div>
            { authentication?
                 <Home  token={token}></Home>:
                   <div className="sign-in"> 
                   <h1>BMS</h1>
                   <form action="">
                       <h1>Sign In</h1>
                       <input placeholder="Email" ref={emailRef} type="email"></input>
                       <input placeholder="Password" ref={passwordRef} type="password"></input>
                       <button className="signin__link" onClick={signIn}>SIGN-IN</button>
                   </form>

                   <h6>Not yet register? <Link to="/signUpPage">sign up</Link></h6>
                   </div>
            }
      </div>
      
    </div>
   
  );
}

export default SignIn;
