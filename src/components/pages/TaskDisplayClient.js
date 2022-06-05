import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height:274,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tabElements:{
      padding:"10px"
  },
  ticHeads:{
      fontWeight:"bold"
  }
}));

export default function TaskDisplayClient({userd}) {
    console.log("dskdskfmdsf",userd)
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
let x =0;
  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
        TabIndicatorProps={{style: {background:'blue'}}}
      >
        {userd.map((item =>
            <Tab label={item.ticketId} {...a11yProps(0)} />
            ))}
      </Tabs>
      
      {userd.map((item=>
        <TabPanel value={value} index={x++} style={{width:'90%'}} >
            <Paper>
                 <div className={classes.tabElements}>
                     <span className={classes.ticHeads}>ticket title :</span> {item.ticketTitle}<br/>

                </div >
                <Divider variant="middle" style={{width:'80%'}} />
                <div className={classes.tabElements}>
                <span  className={classes.ticHeads}>ticket for software  :</span> {item.softwareType}<br/>

                </div>
                <Divider variant="middle" style={{width:'80%'}} />
                <div className={classes.tabElements  }>    
                     <span  className={classes.ticHeads}>ticket priority :</span> {item.ticketPriority}<br/>
                 </div>
                 <Divider variant="middle" style={{width:'80%'}} />
                 <div className={classes.tabElements}>
                     <span  className={classes.ticHeads}>ticket assigned to :</span> {item.assignedTo}<br/>

                </div>
                <Divider variant="middle" style={{width:'80%'}} />
                <div className={classes.tabElements}>
                     <Paper elevation={4}><span className={classes.ticHeads}> ticket description :</span><br/>  {item.tickerDiscription}<br/></Paper>

                </div>
                <Divider variant="middle" style={{width:'80%'}} />
            </Paper>    
      </TabPanel>
      ))}
    </div>
  );
}