import { useSelector } from "react-redux"

export default function Test(){
    const user = useSelector(state=>state.login.user)
    return(
        <h6>{JSON.stringify(user)}</h6>
    )
}