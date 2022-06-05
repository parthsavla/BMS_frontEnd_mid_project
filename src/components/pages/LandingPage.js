import { Grid } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'
import '../css/landing.css'
export default function LandingPage() {
  return (
    <div className='containerMain'>
        <div style={{width:'60%',color:"white",paddingTop:"6em"}}>
            <span style={{fontSize:'4em',padding:"1em",fontWeight:"bold"}}>
                Welcome To the BMS
            </span>
            <p style={{fontSize:'3em',paddingLeft:"1.4em"}}>
                This is your go to bug reporting system, which can strem line your bug management process and save you time and resources
            </p>
            
            <div style={{fontSize:'1.5em',paddingLeft:"2.8em"}}>
                <Link to='/s' style={{backgroundColor:"white",padding:".5em",borderRadius:"2em",textDecoration:"none",color:"black"}}>
                    sign in
                </Link>
                <Link to='/signUpPage' style={{backgroundColor:"white",padding:".5em",borderRadius:"2em",textDecoration:"none",color:"black",marginLeft:"1em"}}>
                    sign up
                </Link>
                
            </div> 
           
        </div>
      
     
    </div>
  )
}
