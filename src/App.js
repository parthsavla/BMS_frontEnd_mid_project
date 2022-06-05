import './App.css';

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from './components/pages/SignUp';
import SignIn from './components/pages/SignIn';
import SIgnUpDevandSupport from './components/pages/SIgnUpDevandSupport';
import ClientAccoutPage from './components/pages/ClientAccountPage';
import SupAccountPage from './components/pages/SupAccountPage';
import DevAccountPage from './components/pages/DevAccountPage';
import LandingPage from './components/pages/LandingPage';



 class App extends React.Component{

  render(){
    
  return(
    <Router>
      <div > 
        <Routes>
          <Route exact path="/" element={ <LandingPage/>}  />
          <Route exact path="/s" element={ <SignIn />}  />
          <Route exact path="/signUpPage" element={ <SignUp />} />
          <Route exact path="/signUpPageForDevsandSupport" element={<SIgnUpDevandSupport/>}/>
          <Route exact path='/clientAccountPage' element={<ClientAccoutPage/>}/>
          <Route exact path='/supAccountPage' element={<SupAccountPage/>}/>
          <Route exact path='/devAccountPage' element={<DevAccountPage/>}/>
        </Routes>
      </div>
    </Router>
  )
  }
}
export default App