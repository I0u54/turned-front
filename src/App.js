
import './App.css';
import './components/css/auth.css'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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
import { useEffect, useState } from 'react';
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



function App() {

  const dispatch = useDispatch()
  const location = useLocation();
  const [isDashboard, setIsDashboard] = useState(location.pathname === '/dashboard' || location.pathname ==='/dashboard/turneds');
  
  let isLoged = useSelector(state => state.login.isLoged)
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
    setIsDashboard(location.pathname === '/dashboard' || location.pathname ==='/dashboard/turneds')
    if (isLoged) {
      userOfToken()

    }
   

  }, [location.pathname])
  return (
        <>
         
      {!isDashboard &&<Box w='100%' h='40px' bgGradient='linear(to-l, #343A40,#00CED1)'>
        <Center h='40px' color='white'>
          You can always disocver our news from here &nbsp;&nbsp;&nbsp;<Button size='xs' leftIcon={<EmailIcon />} colorScheme='gray' variant='solid'>
            Email
          </Button>
        </Center>
      </Box>}
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
                <Route element = { <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8"><h1>this is a test component</h1></div>} path='turneds'/>
               

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
