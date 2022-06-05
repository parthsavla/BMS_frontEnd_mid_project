
import { useEffect, useState } from "react";
import axios  from "axios";
import DeveloperTeamPage from "./DeveloperTeamPage";
import SupportTeamPage from "./SupportTeamPage";
import ClientPage from "./ClientPage";
import SignIn from "./SignIn";

export default  function Home({token}){
    let loadedData ;
    const [name,setName]=useState('');
    const [ID,setID]=useState('');
    const [company,setCompany]=useState('');
    const [email,setEmail]=useState('');
    const [number,setNumber]=useState('');
    const [activeTickets,setActiveTickets]=useState('');
    const [comTickets,setComTickets]=useState('');

    const [pageSelector,setPageSelector] = useState('')
   
    
    useEffect(()=>{
        if(token){
            verifyLogin(token)
        }
    },[token])
    const verifyLogin = async(token)=>{
        const res = await axios.get("http://localhost:5000/api/home",{
            headers:{
                authorization : 'Bearer ' + token,
            },

        });
        loadedData = res.data
        let ps = loadedData.Id
        
       setPageSelector(ps.split("-")[0])
       setName(loadedData.Name)
       setID(loadedData.Id)
       setEmail(loadedData.Email)
       setCompany(loadedData.Company)
       setNumber(loadedData.Number)
       setActiveTickets(loadedData.activeTickets)
       setComTickets(loadedData.completedTicket)
        console.log("this is the recieved data",loadedData)
        console.log("this is the ID ",ps.split("-")[0])
        
    }
    const checkForPage = (name,ID,email,company,number,activeTickets,comTickets)=>{
        let page
        let sentData = [name,ID,email,company,number,activeTickets,comTickets];
        if(pageSelector==="DEV"){
           page = <DeveloperTeamPage sentData={sentData}></DeveloperTeamPage>
        }else if(pageSelector==="CL"){
           page = <ClientPage sentData={sentData}></ClientPage>
           console.log("ld for check pages", name,ID,email,company,number)
        }else if(pageSelector==="SM"){
            page = <SupportTeamPage sentData={sentData}></SupportTeamPage>
        }
        return page
    }
   
    return(
        <div  >
            {checkForPage(name,ID,email,company,number,activeTickets,comTickets) }


        </div>
    )
}