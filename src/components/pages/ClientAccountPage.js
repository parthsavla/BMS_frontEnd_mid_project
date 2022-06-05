import {
    Link,
  } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import React, { useEffect } from 'react'
import axios from "axios";
import TaskDisplayClient from "./TaskDisplayClient";
import HomeIcon from '@material-ui/icons/Home';
import { getAuth, signOut } from "firebase/auth";

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    table: {
      minWidth: 650,
    },
    tableContainer:{
      width:'80%',
      margin:'auto',
      marginTop:'10px'
    }
  }));

export default function ClientAccoutPage(){
  const [completeData, setCompleteData] = React.useState()

    const classes = useStyles();
    useEffect(()=>{
      loadCompleteTicketData()
      console.log("complete data",completeData)
      
    },[])
    async function loadCompleteTicketData  (){
      try{
        
        const res = await axios.get("http://localhost:5000/api/loadCompleteTicket").then((res)=>{
          setCompleteData(res.data)
        })
        
        
      }catch(e){
        console.log(e)
      }   
      
      
    }
    function createData(title, taskId, assignedTo, sofType) {
  return { title, taskId, assignedTo, sofType };
}
const auth = getAuth();
const SignOut = ()=>{
    signOut(auth).then(() => {
    // Sign-out successful.
    window.localStorage.setItem('authentication','false')
    
    console.log("logged out")
 }).catch((error) => {
    // An error happened.
    });
}
const rows = [];
return(
    <div>
        <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <Link to='/'><HomeIcon style={{color:"white"}}/></Link>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Completed Tasks
                </Typography>
               <Button color="inherit" onClick={SignOut}>Log out</Button>
              </Toolbar>
            </AppBar>
        </div>
        <div style={{marginTop:'60px'}}>
        {completeData != undefined?
         //userDataa.map((item => 
      //
        //   (<tr><td key={item.OrderID}>{item.ticketId}</td></tr>)
        //))
        
        <TaskDisplayClient userd={completeData}></TaskDisplayClient>
        :
       "no data"}
       </div>
    </div>
    
)
}