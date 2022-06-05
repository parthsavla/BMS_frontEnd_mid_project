import "../css/signUp.css"
import { auth} from "./Firebase";
import {createUserWithEmailAndPassword } from "firebase/auth";
import React from "react"
import axios from "axios";
import {
    Link,
    Navigate  
  } from "react-router-dom";
import { Paper } from "@material-ui/core";
// function signUpForm(){

    
//     const signUp = e => {
//         e.preventDefault();
//         createUserWithEmailAndPassword(auth,emailRef.current.value, passwordRef.current.value,)
//             .then(userCred => {
//                 const user = userCred.user;
//                 console.log(user)
//             }
//                 )
//                 .catch(err => {console.log(err)})
//      }
  
// }

export default class SignUp extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            clientName:null,
            clientCompany:null,
            emailRef:null,
            passwordRef:null,
            redirect: null,
            clientNumber:null
        }
    }
    handleInputChange = e => {
        
        this.setState({
          [e.target.name]: e.target.value,
        });
        
        

    }
    handleOnBlur = e =>{
        let targetValue = e.target.value
        
        if (targetValue  === '') {
            e.target.className = "nulStyle"
        
            
        }else{
            e.target.className = "cn"
        }
        console.log(e.target.value)
    }
    handleSubmit = (e,props) => {
        e.preventDefault();
        
        const {clientName,clientCompany,clientNumber,emailRef,passwordRef} = this.state
        let emailUpper = emailRef;
        let emailLower = emailUpper.toLowerCase()
        const newClient =  {clientName,clientCompany,clientNumber,emailLower,passwordRef}

        console.log(newClient)
         createUserWithEmailAndPassword(auth,newClient.emailLower,newClient.passwordRef,)
                .then(userCred => {
                     const user = userCred.user;
                     console.log(user)
                     axios.post("http://localhost:5000/api/addNewClient",newClient)
                        .then(() =>{ 
                           
                            console.log(e.target.className)
                            
                        })
                            .catch(err => {
                                console.error(err);
                             });

                        alert('Sign up completed! continue to the Dashboard')
                        this.setState({ redirect: "/" });
                        window.localStorage.setItem('authentication','true')

                    }
         ).catch(err => {
             console.log(err)
             alert("user already exist")
            })
        
    
    }
    render(){
if (this.state.redirect) {
        return <Navigate to={this.state.redirect} />
}
          
 return(
        <div>
            <div className="sign-up">
            <h1>BMS</h1>
                <form name="clientSignUpForm" onSubmit={this.handleSubmit} >
                    <h3>Client Sign Up</h3>
                    <input placeholder="Client Name" onBlur={this.handleOnBlur} className="cn" name="clientName" onChange={this.handleInputChange} type="text" required={true}></input>
                    <input placeholder="Client Company" onBlur={this.handleOnBlur} name="clientCompany" onChange={this.handleInputChange} type="text" required={true}></input>
                    <input placeholder="Client Number" onBlur={this.handleOnBlur} name="clientNumber" onChange={this.handleInputChange} type="tel"  required={true}></input>
                    <input placeholder="Email" name="emailRef" onChange={this.handleInputChange} type="email"></input>
                    <input placeholder="Password" name="passwordRef" onChange={this.handleInputChange} type="password"></input>
                    <button className="signin__link" >SIGN-UP</button>
                </form>
                <h6>Sign up as a Developer or Support team <Link to="/signUpPageForDevsandSupport">sign up</Link></h6>
            </div>
        </div>
        
      
    )}
}