import "../css/signUp.css"
import { auth} from "./Firebase";
import {createUserWithEmailAndPassword } from "firebase/auth";
import React from "react"
import axios from "axios";
import {
    Navigate
  } from "react-router-dom";
  // eslint-disable-next-line 
const options = [
    { value: 'HR', label: 'HR master' },
    { value: 'PAY', label: 'PAY master' },
    { value: 'WEIGHT', label: 'WEIGHT master' },
    { value: 'ERP', label: 'Enterprise Resource Management' }
  ];

export default class SignUpDevandSupport extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            SMName:'',
            devName:'',
            clientName:'',
            emailRef:'',
            passwordRef:'',
            signUpSelection:'Support',
            DevteamType:"HR",
            SMteamType:"HR",
            redirect: null,
            devNumber:null,
            supportNumber:null,
            DevLevel:"Senior",
            SMLevel:"Senior"
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
    handleSubmitDev = e => {
        
        e.preventDefault();
        const {emailRef,passwordRef,devName,devNumber,DevteamType,DevLevel} = this.state
        let emailUpper = emailRef;
        let emailLower = emailUpper.toLowerCase()
        const newDev =  {emailLower,passwordRef,devName,devNumber,DevteamType,DevLevel}
        console.log(newDev)
         createUserWithEmailAndPassword(auth,newDev.emailLower,newDev.passwordRef,)
             .then(userCred => {
                     const user = userCred.user;
                     console.log(user)
                     axios.post("http://localhost:5000/api/addNewDev",newDev)
                     .then(() => console.log('Dev Created'))
                     .catch(err => {
                       console.error(err);
                     });
                     alert('Sign up completed! continue to the Dashboard')
                        this.setState({ redirect: "/" });
                        window.localStorage.setItem('authentication','true')

             }
         ).catch(err => {
            console.log(err)
            alert("email already exists")
            
            })
        
    }
    handleSubmitSupport = e => {
        e.preventDefault();
        
        const {emailRef,passwordRef,SMName,supportNumber,SMteamType,SMLevel} = this.state
        let emailUpper = emailRef;
        let emailLower = emailUpper.toLowerCase()
        const newSM =  {emailLower,passwordRef,SMName,supportNumber,SMteamType,SMLevel}
        console.log(newSM)
         createUserWithEmailAndPassword(auth,newSM.emailLower,newSM.passwordRef)
             .then(userCred => {
                     const user = userCred.user;
                     console.log(user)
                     axios.post("http://localhost:5000/api/addNewSM",newSM)
                     .then(() => console.log('Dev Created'))
                     .catch(err => {
                       console.error(err);
                     });
                     alert('Sign up completed! continue to the Dashboard')
                        this.setState({ redirect: "/" });
                        window.localStorage.setItem('authentication','true')

             }
         ).catch(err => {
            console.log(err)
            alert("email already exists")
            
            })
        
    }
    
    devForm =() =>{
       
        return( 
            <div className="dev-support">
                <form  onSubmit={this.handleSubmitDev} >
                    <input placeholder="Developer Name" name="devName" onBlur={this.handleOnBlur} type="text" onChange={this.handleInputChange} required="true"></input>  
                    <input placeholder="Developer Number" name="devNumber" onBlur={this.handleOnBlur} type="text" onChange={this.handleInputChange} required="true"></input>  
                    <p>
                    <span className="dropdwn">Software Type  :-</span>

                    <select name="DevteamType" className="dropdwn-selection" onChange={this.handleInputChange}>
                        <option value="HR"  >HR master</option>
                        <option value="PAY">PAY master</option>
                        <option value="WEIGHT">WEIGHT master</option>
                        <option value="ERP">Enterprise Resource Management </option>
                    </select>
                    </p>
                    <p>
                    <span className="dropdwn">Developer Level :-</span>

                    <select name="DevLevel" className="dropdwn-selection" onChange={this.handleInputChange}>
                        <option value="Senior"  >Senior</option>
                        <option value="Medium">Medium</option>
                        <option value="Junior">Junior</option>
                    </select>
                    </p>
                    <input placeholder="Email" name="emailRef" onChange={this.handleInputChange} type="email"></input>
                    <input placeholder="Password"    name="passwordRef" onChange={this.handleInputChange} type="password"></input>
                    <button className="signin__link"  >SIGN-UP</button>
                </form>
            </div>
        )
    }

    supportForm = ()=>{
        return( 
            <div className="dev-support">
                <form  onSubmit={this.handleSubmitSupport}>
                    <input placeholder="Name" name="SMName" onBlur={this.handleOnBlur}  type="text" onChange={this.handleInputChange} required="true"></input>
                    <input placeholder="Support Team Phone Number" name="supportNumber" onBlur={this.handleOnBlur} type="text" onChange={this.handleInputChange} required="true"></input>  
                    
                    <p>
                    <span className="dropdwn">Software Type  :-</span>

                    <select name="SMteamType" className="dropdwn-selection" onChange={this.handleInputChange}>
                        <option value="HR"  >HR master</option>
                        <option value="PAY">PAY master</option>
                        <option value="WEIGHT">WEIGHT master</option>
                        <option value="ERP">Enterprise Resource Management </option>
                    </select>
                    </p>
                    <p>
                    <span className="dropdwn">Support Level :-</span>

                    <select name="SMLevel" className="dropdwn-selection" onChange={this.handleInputChange}>
                        <option value="Senior"  >Senior</option>
                        <option value="Medium">Medium</option>
                        <option value="Junior">Junior</option>
                    </select>
                    </p>
                    <input placeholder="Email" name="emailRef" onChange={this.handleInputChange} type="email"></input>
                    <input placeholder="Password" name="passwordRef" onChange={this.handleInputChange} type="password"></input>
                    <button className="signin__link"  >SIGN-UP</button>
                </form>
            </div>
        )
    }
    render(){
        if (this.state.redirect) {
            return <Navigate to={this.state.redirect} />
        }
    return(
        <div>
            <div className="sign-up">
            <h1>BMS</h1>
                <form >
                    <h3>Sign Up For Developers and Support Team</h3>
            
                    <p>
                    <input  type="radio" id="Support" name="signUpSelection" value="Support" onChange={this.handleInputChange}  defaultChecked/>
                    <label for="Support">Support Team</label>
                    <input type="radio" id="Developer"  name="signUpSelection" value="Developer" onChange={this.handleInputChange}/>
                    <label for="Developer">Developer</label>
                    </p>
                </form>
              {
                  this.state.signUpSelection === "Support"? 
                  this.supportForm():
                  this.devForm()
              }
                    
              
                
            </div>
        </div>
      
    )}
}