import { Button, Text, useToast } from "@chakra-ui/react"
import axios from "axios"
import { useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

export default function Forget(){
    const emailRef = useRef(null)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const navigate = useNavigate()
    let [loading,setLoading] = useState(false)
    const toast = useToast()




    const submit = async (e)=>{
        setLoading(true)

        e.preventDefault()
        if(!emailRef.current.value ){
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
        }
        axios.post('/forget',{email:emailRef.current.value}).then((response)=>{
            setLoading(false)

            toast({
                title: "Token sent ",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'left-top',

              })
           
                navigate('/reset',{state:{email:emailRef.current.value}})
              
        }).catch((error)=>{
            setLoading(false)

          
              toast({
                title: error.response.data,
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'left-top',

              })
        })

    }

    return(
    <section className="forgetSection" >
        <form>
            <div className="form-head">
               
                <Text
                        bgGradient='linear(to-l, #00CED1, #343A40)'
                        bgClip='text'
                        fontSize='4xl'
                        fontWeight='extrabold'
                    >
                        Forget Password
                    </Text>
            </div>
            <div className="form-body mt-5">
                <div className="email">
                    <label>Email</label><br />
                    <input type="email" placeholder="Enter your email" className="form-control" ref={emailRef}/>
                </div>
               
               
                <div className="email " style={{marginTop:"36px"}}>
                   
                {loading ?  <Button w='100%'
                        marginBottom={'15px'}
                            isLoading
                            loadingText='Sending..'
                            colorScheme='teal'
                            variant='outline'
                        >
                            Send Token
                        </Button> : <Button w='100%' onClick={(e) => { submit(e) }}
                        marginBottom={'15px'}
                            
                            colorScheme='teal'
                            variant='outline'
                        >
                             Send Token
                        </Button>}                </div>
            </div>

        
        </form>

    </section>
    )
}