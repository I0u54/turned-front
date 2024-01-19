
import './App.css';
import './components/css/auth.css'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  useDisclosure,
  Code,
} from '@chakra-ui/react'
import Home from './components/home';
import NoAuth from './components/noAuthComponents/noAuth';
import Login from './components/noAuthComponents/login';
import Auth from './components/authComponents/auth';
import Logout from './components/authComponents/logout';
import Register from './components/noAuthComponents/register';
import Forget from './components/noAuthComponents/forget';
import Reset from './components/noAuthComponents/reset';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setIsloged, setUser } from './slices/loginSlice';
import { useEffect, useRef, useState } from 'react';
import Test from './components/authComponents/test';
import Header from './components/header';
import Info from './components/authComponents/info';
import Profile from './components/authComponents/profile';
import { Box, Button, Center } from '@chakra-ui/react';
import { EmailIcon } from '@chakra-ui/icons';
import Turneds from './components/turneds';
import Footer from './components/footer';
import Dash from './components/authComponents/dashboard/dash';
import Dashboard from './components/authComponents/dashboard/dashboard';
import TurnedsDash from './components/authComponents/dashboard/turnedsDash';
import AnimatedCursor from "react-animated-cursor"




function App() {

  const dispatch = useDispatch()
  const location = useLocation();
  const [isDashboard, setIsDashboard] = useState(location.pathname === '/dashboard' || location.pathname === '/dashboard/turneds');

  let isLoged = useSelector(state => state.login.isLoged)
  const { isOpen: alertIsOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const cancelRef = useRef()


  let userOfToken = async () => {
    await axios.get('/user', {

      headers: {

        Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`

      }
    }).then((response) => {
      dispatch(setUser(response.data.user))
    }).catch((error) => {
      localStorage.removeItem('token')
      dispatch(setIsloged())
    })

  }
 
  useEffect(() => {
   
    setIsDashboard(location.pathname === '/dashboard' || location.pathname === '/dashboard/turneds')
    if (isLoged) {
      userOfToken()

    }


  }, [location.pathname])
  return (
    <>
    <div >
    <AnimatedCursor
        innerSize={8}
        outerSize={35}
        innerScale={1}
        outerScale={1.5}
        outerAlpha={0}
        hasBlendMode={true}
        
        clickables={[
          'a',
          'input[type="text"]', 
          'input[type="email"]',
          'input[type="number"]',
          'input[type="submit"]',
          'input[type="image"]',
          'label[for]',
          'select',
          'h1',
          'h2',
          'h3',
          'span',
          'textarea',
          'button',
          '.link',
          'input[type="password"]',
          
          {
            target: '.custom',
            options: {
              innerSize: 12,
              outerSize: 12,
              color: '255, 255, 255',
              outerAlpha: 0.3,
              innerScale: 0.7,
              outerScale: 5
            }
          }
        ]}
        
        innerStyle={{
          backgroundColor: '#0FA4A7',
          zIndex:'99990'
          

        }}
        outerStyle={{
          border: '3px solid #0FA4A7',
          zIndex:'99990'
        }}
      />


    </div>
      
      {/* <div id='cursor' style={{left:cursorX +'px',top:cursorY+'px'}}></div> */}
      <AlertDialog
        isOpen={alertIsOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAlertClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Copy Email
            </AlertDialogHeader>

            <AlertDialogBody>
              <div className='w-full flex items-center h-[100px] justify-center'>
                <Code fontSize='large'>ismailtahiri2002@gmail.com</Code>

              </div>

            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onAlertClose} colorScheme='teal'>
                Done
              </Button>

            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {!isDashboard && <div className='topheader'><Box w='100%' h='40px' bgGradient='linear(to-l, #343A40,#00CED1)'>
        <Center h='40px' color='white' >
          You can always disocver our news from here &nbsp;&nbsp;&nbsp;<Button onClick={onAlertOpen} size='xs' leftIcon={<EmailIcon />} colorScheme='gray' variant='solid'>
            Email
          </Button>
        </Center>
      </Box></div> }
      {!isDashboard && <Header />}


      <section className='turneSection'>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/turneds" element={<Turneds />} />
          <Route element={<NoAuth />}>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/forget' element={<Forget />} />
            <Route path='/reset' element={<Reset />} />
          </Route>
          <Route element={<Auth />}>
            <Route path='/logout' element={<Logout />} />
            <Route path='/test' element={<Test />} />
            <Route path='/daret/info/:id' element={<Info />} />
            <Route path='/profile' element={<Profile />} />
          </Route>

          <Route element={<Auth />}>
            <Route element={<Dash />}>
              <Route element={<Dashboard />} path='/dashboard'>
                <Route element={<TurnedsDash />} path='turneds' />


              </Route>


            </Route>
          </Route>

        </Routes>
      </section>
      {!isDashboard && <Footer />}

    </>

  )
}

export default App;
