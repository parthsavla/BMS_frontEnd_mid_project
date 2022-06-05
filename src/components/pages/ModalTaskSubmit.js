import React, {useState,setState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from "axios";
import AddIcon from '@material-ui/icons/Add';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height:'fit-content',
    width:'50%'
  },
  createTicket: {
      display:"flex",
      flexDirection:'column'
  },
  btnAddTask:{
    background:"none",
    border:"none",
    padding:"3em",
    height:'100%',
    width:'100%',
    marginTop:"8px",
    borderRadius:"35px",
  },
  spanLables:{
    fontWeight:"bold"
  },
  spanLablesTX:{
    fontWeight:"bold"
  },
  btnSumbmit:{
    width:"40%",
    margin:"auto",
    marginTop:'10px',backgroundColor:'#3f51b5',
    borderRadius:"9px",
    padding:"0.5em",
    color:"white",
    border:'none'
  }
}));

export default function ModalTaskSubmit({ticId,ticEmail}) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [ticTitle, setTicTitle] = React.useState("");
  const [ticPrior, setTicPrior] = React.useState("");
  const [ticDescrip, setTicDescrip] = React.useState("");
  const [remotePref, setRemotePref] = React.useState("");
  const [sofType, setSofType] = React.useState("");
  
  
  const handleSubmitTicket = (e) => {
    e.preventDefault();
    
  
    const newTicket =  {ticTitle,ticPrior,ticDescrip,remotePref,sofType,ticEmail,ticId}

    console.log(newTicket)
    axios.post("http://localhost:5000/api/addNewTicket",newTicket)
                        .then(() =>{ 
                            
                          setTicTitle("")
                          setTicPrior("")
                          setTicDescrip("")
                          setRemotePref("")
                          setSofType("")
                          
                        })
                            .catch(err => {
                                console.error(err);
                             });
                             
                             alert('ticket submitted')
                             setOpen(false);
                             window.location.reload()
                             
}
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    
  };


  return (
    <div>
      <button type="button" onClick={handleOpen} className={classes.btnAddTask}>
        <AddIcon color="primary" style={{ fontSize: 60 }}></AddIcon><br/>
        <span style={{color:"blue",fontSize:18}}>ADD NEW TICKET</span>
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ 
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
          <form onSubmit={handleSubmitTicket} className={classes.createTicket}>
                    <h3>Add Tickets</h3>
                    <div>
                        <span className={classes.spanLables}>Ticket Title</span>
                       <input placeholder="Ticket Title"  onChange={e => setTicTitle(e.target.value)} style={{marginLeft:'34%'}}className="cn" name="clientName"  type="text" required={true}></input>
                    </div><br/>
                    <div>
                    <span className={classes.spanLables}>Software Type</span>
                      <select name="DevteamType" className="dropdwn-selection-type" style={{marginLeft:'30%'}}  onChange={e => setSofType(e.target.value)}>
                          <option value="HR"  >HR master</option>
                          <option value="PAY">PAY master</option>
                          <option value="WEIGHT">WEIGHT master</option>
                          <option value="ERP">Enterprise Resource Management </option>
                      </select>
                    </div><br/>
                    <div>
                    <span className={classes.spanLables}>Ticket Priority</span>
                      <select name="priority" className="dropdwn-selection-priority" onChange={e => setTicPrior(e.target.value)} style={{marginLeft:'30%'}} >
                          <option value="LOW"  >Low Priority</option>
                          <option value="MED">Medium Priority</option>
                          <option value="HIGH">High Priority</option>
                      </select>
                    </div><br/>
                    <div>
                    <span className={classes.spanLables}> Remote Connection Preference</span>
                    
                    </div><br/>
                    <textarea  onChange={e => setRemotePref(e.target.value)}></textarea>
                    <div>
                    <span className={classes.spanLables}>Ticket Description</span>
                    </div><br/>
                    <textarea  onChange={e => setTicDescrip(e.target.value)}></textarea>
                    <button className={classes.btnSumbmit} >Add Ticket</button>
          </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}