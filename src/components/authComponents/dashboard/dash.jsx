import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

export default function Dash(){
    let user = useSelector(state=>state.login.user)
    const navigate = useNavigate()


return(
   user.admin ? <Outlet/> : navigate('/')
)


}