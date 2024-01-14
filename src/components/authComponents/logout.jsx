import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setIsloged, setUser } from "../../slices/loginSlice";
;

export default function Logout(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logout = async ()=>{
        await axios.post('/logout',{},{
            
            headers: {
               
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
                
            }

        }).then((response)=>{
         
            localStorage.removeItem('token')
            dispatch(setIsloged())
            dispatch(setUser({}))
            navigate('/')
        }).catch((error)=>{
            navigate('/')

        })
    }
   useEffect(()=>{
       logout()
   },[])
    
}