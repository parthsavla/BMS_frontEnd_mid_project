import {
    Link,
    Navigate  
  } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useEffect } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import TaskDisplayClient from "./TaskDisplayClient";
import TaskDisplaySupport from "./TaskDisplayDeveloper";
import HomeIcon from '@material-ui/icons/Home';
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

export default function SupAccountPage(){
    let [redirect,setRedirect] = React.useState(null)
  const [completeData, setCompleteData] = React.useState()

    const classes = useStyles();
    useEffect(()=>{
      loadCompleteTicketData()
      console.log("complete data",completeData)
      
    },[])
    async function loadCompleteTicketData  (){
      try{
        
        const res = await axios.get("http://localhost:5000/api/loadCompleteTicketSup").then((res)=>{
          setCompleteData(res.data)
        })
        
        
      }catch(e){
        console.log(e)
      }   
      
      
    }
    function createData(title, taskId, assignedTo, sofType) {
  return { title, taskId, assignedTo, sofType };
}

const rows = [];
return(
    <div>
        <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <Link to='/'><HomeIcon /></Link>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Completed Tasks
                </Typography>
               <Button color="inherit">Log out</Button>
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
        <CircularProgress />}
       </div>
       
    </div>
    
)
}