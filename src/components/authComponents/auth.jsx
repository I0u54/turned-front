import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { setIsloged } from "../../slices/loginSlice";
import { useDispatch, useSelector } from "react-redux";




export default function Auth(){
    let check = useSelector(state=>state.login.isLoged)

    let [valid,setValid] = useState(false)
    let [finished,setFinished] = useState(false)
    
    
    const verifyToken = async ()=>{
        axios.post("/verify",{},{
            headers: {
                   
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                
            }
    
    
        }).then(()=>{
            setValid(true)
            setFinished(true)
    
        }).catch(()=>{
            setValid(false)
            setFinished(true)
           check  && localStorage.removeItem("token")
            
            
        })
    }
    useEffect(()=>{
        check ?  verifyToken() : setFinished(true)

        
       
    },[])
    if (finished){
        return(
            check == false  ? <Navigate to="/login"/> : valid ?  <Outlet/>  : <Navigate to="/"/>
           
       )

    }
    
}