import { useRef, useState } from "react"
import axios from "axios"
import Swal from "sweetalert2"
import { useDispatch } from "react-redux"
import { setIsloged, setUser } from "../../slices/loginSlice"
import { Link, useNavigate } from "react-router-dom"
import { Button, Text } from "@chakra-ui/react"
import { useToast } from '@chakra-ui/react'


export default function Login() {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    let [loading,setLoading] = useState(false)
    let dispatch = useDispatch();
    const navigate = useNavigate()
     const toast = useToast()


    const submit = async (e) => {
        e.preventDefault()
        setLoading(true)

        if (!emailRef.current.value) {
            setLoading(false)

            toast({
                title: "all fields are mendatory",
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position: 'left-top',

              })
            
            return
        } else if (!emailRegex.test(emailRef.current.value)) {
            setLoading(false)
          
            toast({
                title: 'the email field must be in email format ',
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position: 'left-top',

              })
            return
        } else if (!passwordRef.current.value) {
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
        await axios.post('/login', { email: emailRef.current.value, password: passwordRef.current.value }).then((response) => {
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', JSON.stringify(response.data.token))
            dispatch(setIsloged())
            setLoading(false)

            toast({
                title: 'Welcome back ',
               
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'left-top',
              })

            navigate("/")
           
        }).catch((error) => {
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
    return (

        <section className="loginSection" >
            <form>
                <div className="form-head">

                <Text
                        bgGradient='linear(to-l, #00CED1, #343A40)'
                        bgClip='text'
                        fontSize='4xl'
                        fontWeight='extrabold'
                    >
                        Login
                    </Text>
                </div>
                <div className="form-body mt-5">
                    <div className="email">
                        <label>Email</label><br />
                        <input type="email" placeholder="Enter your email" className="form-control" ref={emailRef} />
                    </div>
                    <div className="email mt-3">
                        <label>Password</label><br />
                        <input type="password" placeholder="Enter your password" className="form-control" ref={passwordRef} />
                    </div>

                    <div className="email" style={{ marginTop: "40px" }}>
                    {loading ?  <Button w='100%'
                        marginBottom={'15px'}
                            isLoading
                            loadingText='Loging'
                            colorScheme='teal'
                            variant='outline'
                        >
                            Login
                        </Button> : <Button w='100%' onClick={(e) => { submit(e) }}
                        marginBottom={'15px'}
                            
                            colorScheme='teal'
                            variant='outline'
                        >
                            Login
                        </Button>}

                    </div>
                </div>
                <p> If you dont have an accout you can sign up from <Link to="/register" style={{ color: "#38B2AC" }}> Here</Link> !  or reset your password from <Link to="/forget" style={{ color: "#38B2AC" }}> Here</Link>.  </p>



            </form>

        </section>
    )
}