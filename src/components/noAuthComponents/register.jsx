import axios from "axios"
import { useRef, useState } from "react"
import Swal from "sweetalert2"
import { setIsloged, setUser } from "../../slices/loginSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Button, Text, useToast } from "@chakra-ui/react"


export default function Register(){
    const toast = useToast()

    const nameRef  = useRef(null)
    
    const lastNameRef  = useRef(null)
    const emailRef  = useRef(null)
    const passwordRef  = useRef(null)
    const passwrodConfirmationRef  = useRef(null)
    let [loading,setLoading] = useState(false)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const submit = async (e)=>{
        e.preventDefault()
        setLoading(true)

        if(!emailRef.current.value || !nameRef.current.value || !lastNameRef.current.value || !passwordRef.current.value || !passwrodConfirmationRef.current.value){
            setLoading(false)

            toast({
                title: "all fields are mendatory",
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position: 'left-top',

              })
              return
        } else if(!emailRegex.test(emailRef.current.value)){
            setLoading(false)

            toast({
                title: 'the email field must be in email format ',
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position: 'left-top',

              })
              return
        } else if(passwordRef.current.value != passwrodConfirmationRef.current.value){
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
        await axios.post('register',{email:emailRef.current.value,name:nameRef.current.value,lastName:lastNameRef.current.value,password1:passwordRef.current.value,password2:passwrodConfirmationRef.current.value}).then((response)=>{
            dispatch(setUser(response.data.user))
            localStorage.setItem('token',JSON.stringify(response.data.token))
            dispatch(setIsloged())
            setLoading(false)

            toast({
              
                title: "We've created your account for you.",
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
      
        <section className="formSection" >
            <form className="register">
                <div className="form-head">
                   
                    <Text
                        bgGradient='linear(to-l, #00CED1, #343A40)'
                        bgClip='text'
                        fontSize='4xl'
                        fontWeight='extrabold'
                    >
                        Registration
                    </Text>
                </div>
                <div className="form-body">
                    <div className="email">
                        <label>Email</label><br />
                        <input type="email" placeholder="Enter your email" className="form-control" ref={emailRef}/>
                    </div>
                    <div className="fnln">
                        <div className="first">
                            <label>First Name</label><br />
                            <input type="text" placeholder="Enter your first name" className="form-control" ref={nameRef}/>
                        </div>
                        <div className="second">
                            <label>Last Name </label><br />
                            <input type="text" placeholder="Enter your last name " className="form-control" ref ={lastNameRef}/>
                        </div>
                    </div>
                    <div className="fnln">
                        <div className="first">
                            <label>Password</label><br />
                            <input type="password" placeholder="Enter your password" className="form-control" ref={passwordRef}/>
                        </div>
                        <div className="second">
                            <label>Confirm Password</label><br />
                            <input type="password" placeholder="Confirm your password" className="form-control" ref={passwrodConfirmationRef}/>
                        </div>
                    </div>
                    <div className="email" style={{marginTop:"45px"}}>
                        
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