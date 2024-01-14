import { Button, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
    let isLoged = useSelector(state => state.login.isLoged)
    let user = useSelector(state => state.login.user)
    const navigate = useNavigate()
    return (
        <header className="sticky">
            <Link to='/'>


            <Text
                        bgGradient='linear(to-l,  #343A40,#00CED1)'
                        bgClip='text'
                        fontSize='3xl'
                        fontWeight='extrabold'
                    >
                        Turned
                    </Text>
            </Link>
       
            {!isLoged ?
            <nav>

            <Link to='register'><Button colorScheme='gray'>Sign Up</Button></Link>
            <Link to='/login'>  <Button colorScheme='teal'>Login</Button></Link>
        </nav> : 
        <nav>

        <Link to='/profile'> <Button colorScheme='teal'>Profile</Button></Link>
        <Link to='/logout'> <Button colorScheme='gray'>Logout</Button></Link>
        
    </nav>
            
        
        }
            
            
           
           
        </header>
    )
}