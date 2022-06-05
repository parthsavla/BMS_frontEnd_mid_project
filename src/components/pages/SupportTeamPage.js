import React, { useEffect } from 'react';
import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import CircularProgress from '@material-ui/core/CircularProgress';

import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { getAuth, signOut } from "firebase/auth";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import axios  from "axios";
import TaskDisplaySupport from './TaskDisplaySupport';
import Chart from "react-google-charts";
import { Divider } from '@material-ui/core';
import {
  Link
} from "react-router-dom";
const auth = getAuth();
const SignOut = ()=>{
    signOut(auth).then(() => {
    // Sign-out successful.
    window.localStorage.setItem('authentication','false')
    window.location.reload()
    console.log("logged out")
 }).catch((error) => {
    // An error happened.
    });
}
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
 
  inputRoot: {
    color: 'inherit',
  },
 
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  paperProfileDetails:{
    margin: theme.spacing(4),
    height:200,
    width:300,
    borderRadius:"35px",
    textAlign:"center"
  },
  paperAdd:{
    margin: theme.spacing(4),
    height:200,
    width:300,
    border:"1px dashed blue",
    borderRadius:"35px",
  },
  paperGraph:{
    margin: theme.spacing(4),
    height:'fit-content',
    width:'fit-content',
    borderRadius:"35px",
    padding:'5px'
    
  },
  displayDataPoniter:{
    margin: theme.spacing(4),

    height:'auto',
    width:'auto'
  },
  detailsCon:{
    margin: "auto",
    padding:"10px",
    fontFamily: '"Helvetica Neue"'

  }
}));

export default function SupportTeamPage({sentData}) {
  const dispalyLables = ['Name:',"ID:",'Email:','Company','Number',"Active Tickets",'Completed Tickets']

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  let [ticketData,setTicketData] = React.useState()
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const loadticketSupportData = async() =>{
      try{
         const res = await axios.get("http://localhost:5000/api/loadSupportTicket")
         .then((res)=>{
           setTicketData(res.data)
         })
       }catch(e){
         console.log(e)
       }  
  }
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={SignOut}>Log Out</MenuItem>
     <Link to="/supAccountPage"><MenuItem onClick={handleMenuClose}>Completed Tasks</MenuItem></Link>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
    
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
useEffect(()=>{
  loadticketSupportData()
},[])
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            
          >
            </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Support Team Dashboard
          </Typography>
         
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Grid container alignItems="center" justifyContent="center">
          <Grid item>
            <Paper className = {classes.paperProfileDetails} variant="outlined" elevation="6" >
            <Grid container className={classes.detailsCon} alignItems="center"  justifyContent="center" >
              <Grid item style={{textAlign:"left"}}>
              {
                
                dispalyLables.map((items=>
                  <div style={{padding:"2px"}}>{items}<br/><Divider /></div>
                  ))

              }
              </Grid>
              <Grid item >
              {
                !sentData?'no data':
                sentData.map((items=>
                  <div style={{padding:"2px"}}>{items}<br/><Divider style={{background:"blue"}}></Divider></div>
                  ))

              }
              </Grid>
            </Grid>
            </Paper>
          </Grid>  
          <Grid item>
            <Paper className = {classes.paperGraph} variant="outlined">
            <Chart
              borderRadius={"35"}

              width={'auto'}
              height={'auto'}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[
                  ['ticket Status','number of tickets'],
                  ['Active Tasks',sentData[5] ],
                  ['Completed Tasks',sentData[6]],
                ]}
                options={{
                  
                  pieSliceText: 'value',
                  pieHole: 0.4,
                }}
              // For tests
              rootProps={{ 'data-testid': '2' }}
          />
            </Paper>
          </Grid>
        </Grid>
        <div>
          
       {ticketData != undefined?
         //ticketData.map((item => 
      
           //(<tr><td key={item.OrderID}>{item.ticketId}</td></tr>)
        //))
        <TaskDisplaySupport tdata = {ticketData}></TaskDisplaySupport>
        :
       <CircularProgress/>}
      
      </div>
    </div>
  );
}

















