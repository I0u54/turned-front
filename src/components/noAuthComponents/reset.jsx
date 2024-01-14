import axios from "axios"
import { useRef, useState } from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom"
import { setIsloged, setUser } from "../../slices/loginSlice"
import { useDispatch } from "react-redux"
import Swal from "sweetalert2"
import { Button, Text, useToast } from "@chakra-ui/react"

export default function Reset(){
    let {state} = useLocation()
    let tokenRef = useRef(null)
    let passwordRef = useRef(null)
    let passwordConfirmationRef = useRef(null)
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let [loading,setLoading] = useState(false)
    const toast = useToast()
    let submit = async (e)=>{
        e.preventDefault()
        setLoading(true)
        if(!tokenRef.current.value || !passwordRef.current.value || !passwordConfirmationRef.current.value){
            setLoading(false)

            toast({
                title: "all fields are mendatory",
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position: 'left-top',

              })
            return
        }
        if(passwordRef.current.value != passwordConfirmationRef.current.value){
            setLoading(false)

            toast({
                title: 'The password must be equal the password confirmation ',
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position: 'left-top',

              })
        
            
            return
        }
        await axios.put('/reset',{
            email:state.email,
            token:tokenRef.current.value,
            password1:passwordRef.current.value,
            password2:passwordConfirmationRef.current.value
        }).then((response)=>{
           
            console.log(response);
            localStorage.setItem('token',JSON.stringify(response.data.token))
            dispatch(setUser(response.data.user))
            dispatch(setIsloged())
            setLoading(false)
            toast({
                title: "Welcome back",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'left-top',

              })

       

            navigate("/")
              
           
           
            
        }).catch((error)=>{
            setLoading(false)

            toast({
                title: error.response.data.error != undefined ? error.response.data.error : "there is a problem in the fields check them!",
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'left-top',

              })
        })
    }
    return(
        state == null  ?  <Navigate to='/'/> :
    
        <section className="resetSection" >
        <form>
            <div className="form-head">
                    <Text
                        bgGradient='linear(to-l, #00CED1, #343A40)'
                        bgClip='text'
                        fontSize='4xl'
                        fontWeight='extrabold'
                    >
                        Reset Password
                    </Text>
            </div>
            <div className="form-body mt-5">
                <div className="email">
                    <label>Token</label><br />
                    <input type="text" placeholder="Enter your token" className="form-control" ref={tokenRef}/>
                </div>
                <div className="email mt-3">
                    <label>Password</label><br />
                    <input type="password" placeholder="Enter your password" className="form-control"  ref={passwordRef}/>
                </div>
                <div className="email mt-3">
                    <label>Confirm Password</label><br />
                    <input type="password" placeholder="Confirm your password" className="form-control" ref={passwordConfirmationRef}/>
                </div>
               
               
                <div className="email " style={{marginTop:"36px"}}>
                   
                    
                {loading ?  <Button w='100%'
                        marginBottom={'15px'}
                            isLoading
                            loadingText='Submitung'
                            colorScheme='teal'
                            variant='outline'
                        >
                            Submit
                        </Button> : <Button w='100%' onClick={(e) => { submit(e) }}
                        marginBottom={'15px'}
                            
                            colorScheme='teal'
                            variant='outline'
                        >
                            Submit
                        </Button>}
                </div>
            </div>

        
        </form>

    </section>
    
     
    )
}