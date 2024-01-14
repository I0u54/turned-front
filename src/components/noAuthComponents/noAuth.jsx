import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function NoAuth(){
    let check = useSelector(state=>state.login.isLoged)

    return(
        
        !check ? <Outlet/> : <Navigate to="/"/>

    )
}