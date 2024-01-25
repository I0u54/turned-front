import { Button, Spinner, Text, Tooltip, useDisclosure, useToast } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { Link, Outlet } from "react-router-dom"
import Chart from "./chart"
import ChartComp from "./chart"
import Stats from "./stats"
import Participations from "./participations"


import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
} from '@chakra-ui/react'
import axios from "axios"
import { useDispatch } from "react-redux"
import { setTurnedStatus } from "../../../slices/turnedSlice"
import Users from "./users"
import Donut from "./donut"



export default function Dashboard() {
    const [toggle, setToggle] = useState(false)
    const { isOpen, onOpen, onClose } = useDisclosure()
    const priceRef = useRef()
    const durationRef = useRef()
    const durationTypeRef = useRef()
    const cancelRef = useRef()
    const toast = useToast()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)

    const storeTurned = async () => {
        if (!durationRef.current.value || !durationTypeRef.current.value || !priceRef.current.value) {
            toast({

                title: "all fields are mendatory",
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position: 'left-top',

            })


            return;
        }
        else if (!/^\d+$/.test(durationRef.current.value)) {
            toast({

                title: "duration must be number",
                status: 'warning',
                duration: 4000,
                isClosable: true,
                position: 'left-top',

            })


            return;

        }
        await axios.post('/storeDaret', { price: priceRef.current.value, pnumber: durationRef.current.value, duration: durationRef.current.value, dtype: durationTypeRef.current.value }, {
            headers: {

                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        }).then((response) => {
            onClose()
            toast({

                title: 'turned has been created with success',
                status: 'success',
                duration: 4000,
                isClosable: true,
                position: 'left-top',

            })
            durationRef.current.value = ""
            durationTypeRef.current.value = ""
            priceRef.current.value = ""
            dispatch(setTurnedStatus('idle'))

        }).catch((error) => {
            toast({

                title: error.response.data.error,
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'left-top',

            })
        })

    }
    const remindPeople = async ()=>{
        setLoading(true)
        await axios.post('/remindPeople',{},{
            headers: {

                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        }).then((response)=>{
            setLoading(false)

            toast({

                title: response.data.message,
                status: 'success',
                duration: 8000,
                isClosable: true,
                position: 'left-top',

            })

        }).catch((error) => {
            setLoading(false)

            toast({

                title: error.response.data.error,
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'left-top',

            })
        })
    }

    return (

        <>



            <div>
                <nav className="bg-white border-b border-gray-200 fixed z-30 w-full">
                    <div className="px-3 py-3 lg:px-5 lg:pl-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center justify-start">
                                <button
                                    id="toggleSidebarMobile"
                                    aria-expanded="true"
                                    aria-controls="sidebar"
                                    onClick={() => { setToggle(!toggle) }}
                                    className="lg:hidden mr-2 text-gray-600 hover:text-gray-900 cursor-pointer p-2 hover:bg-gray-100 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 rounded"
                                >
                                    <svg
                                        id="toggleSidebarMobileHamburger"
                                        className="w-6 h-6"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <svg
                                        id="toggleSidebarMobileClose"
                                        className="w-6 h-6 hidden"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                <a
                                    href="#"
                                    className="text-xl font-bold flex items-center lg:ml-2.5"
                                >
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
                                </a>

                            </div>
                            <div className="flex items-center">
                                <button
                                    id="toggleSidebarMobileSearch"
                                    type="button"
                                    className=" text-gray-500 hover:text-gray-900 hover:bg-gray-100 p-2 rounded-lg"
                                >
                                    <span className="sr-only">Search</span>
                                    <svg
                                        className="w-6 h-6"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>

                                <Link
                                    href="#"
                                    className="hidden sm:inline-flex ml-5 text-white bg-cyan-600 hover:bg-cyan-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-3"
                                >
                                    <svg
                                        className="svg-inline--fa fa-gem -ml-1 mr-2 h-4 w-4"
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="gem"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M378.7 32H133.3L256 182.7L378.7 32zM512 192l-107.4-141.3L289.6 192H512zM107.4 50.67L0 192h222.4L107.4 50.67zM244.3 474.9C247.3 478.2 251.6 480 256 480s8.653-1.828 11.67-5.062L510.6 224H1.365L244.3 474.9z"
                                        />
                                    </svg>
                                    Admin
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="flex overflow-hidden bg-white pt-16">
                    <aside
                        id="sidebar"
                        className={`fixed ${!toggle && 'hidden'} z-20 h-full top-0 left-0 pt-16 flex lg:flex flex-shrink-0 flex-col w-64 transition-width duration-75 `}
                        aria-label="Sidebar"
                    >
                        <AlertDialog
                            isOpen={isOpen}
                            leastDestructiveRef={cancelRef}
                            onClose={onClose}
                            isCentered
                        >
                            <AlertDialogOverlay>
                                <AlertDialogContent>
                                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                        Create a turned
                                    </AlertDialogHeader>

                                    <AlertDialogBody>
                                        <form className="bg-white  rounded px-4 pt-3  ">
                                            <div className="mb-4">
                                                <label
                                                    className="block text-gray-700 text-sm font-bold mb-2"
                                                    htmlFor="price"
                                                >
                                                    Price
                                                </label>
                                                <input
                                                    className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    id="price"
                                                    type="text"
                                                    placeholder="Price"
                                                    ref={priceRef}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label
                                                    className="block text-gray-700 text-sm font-bold mb-2"
                                                    htmlFor="Duration"
                                                >
                                                    Duration
                                                </label>
                                                <input
                                                    className=" appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                                    id="Duration"
                                                    type="number"
                                                    placeholder="Duration"
                                                    ref={durationRef}
                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label
                                                    className="block text-gray-700 text-sm font-bold mb-2"
                                                    htmlFor="dtype"
                                                >
                                                    Duration type
                                                </label>
                                                <select id="countries" className=" border rounded  block w-full p-2.5 text-gray-400 leading-tight focus:outline-none focus:shadow-outline" ref={durationTypeRef}>
                                                    <option selected disabled>Choose The Duration Type</option>
                                                    <option value="month" className="text-gray-500">Month</option>
                                                    <option value="week" className="text-gray-500">Week</option>

                                                    <option value="day" className="text-gray-500">Day</option>
                                                </select>
                                            </div>



                                        </form>

                                    </AlertDialogBody>

                                    <AlertDialogFooter>
                                        <Button ref={cancelRef} onClick={onClose}>
                                            Cancel
                                        </Button>
                                        <Button colorScheme='teal' onClick={() => { storeTurned() }} ml={3}>
                                            Store
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialogOverlay>
                        </AlertDialog>
                        <div className="relative flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white pt-0">
                            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                                <div className="flex-1 px-3 bg-white divide-y space-y-1">
                                    <ul className="space-y-2 pb-2">
                                        <li>
                                            <form action="#" method="GET" className="lg:hidden">
                                                <label htmlFor="mobile-search" className="sr-only">
                                                    Search
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <svg
                                                            className="w-5 h-5 text-gray-500"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                        >
                                                            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                                        </svg>
                                                    </div>
                                                    <input
                                                        type="text"
                                                        name="email"
                                                        id="mobile-search"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:ring-cyan-600 block w-full pl-10 p-2.5"
                                                        placeholder="Search"
                                                    />
                                                </div>
                                            </form>
                                        </li>
                                        <li>
                                            <Link
                                                to="/dashboard"
                                                className="text-base text-gray-900 font-normal rounded-lg flex items-center p-2 hover:bg-gray-100 group"
                                            >
                                                <svg
                                                    className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition duration-75"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                                                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                                                </svg>
                                                <span className="ml-3">Dashboard</span>
                                            </Link>
                                        </li>
                                        <li>
                                            <a
                                               
                                                className="text-base cursor-not-allowed text-gray-500 font-normal rounded-lg hover:bg-gray-50 flex items-center p-2 group hover:text-gray-400 "
                                            >
                                                <svg
                                                    className="w-6 h-6 text-gray-400 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                                </svg>
                                                <span className="ml-3 flex-1 whitespace-nowrap">
                                                    App
                                                </span>
                                                
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                               
                                                className="text-base cursor-not-allowed text-gray-500 font-normal rounded-lg hover:bg-gray-50 flex items-center p-2 group hover:text-gray-400 "
                                            >
                                                <svg
                                                    className="w-6 h-6 text-gray-400 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z" />
                                                    <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
                                                </svg>
                                                <span className="ml-3 flex-1 whitespace-nowrap">Inbox</span>
                                               
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                               
                                                className="text-base cursor-not-allowed text-gray-500 font-normal rounded-lg hover:bg-gray-50 flex items-center p-2 group hover:text-gray-400 "
                                            >
                                                <svg
                                                    className="w-6 h-6 text-gray-400 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <span className="ml-3 flex-1 whitespace-nowrap">Users</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="text-base cursor-not-allowed text-gray-500 font-normal rounded-lg hover:bg-gray-50 flex items-center p-2 group hover:text-gray-400 "
                                            >
                                                <svg
                                                    className="w-6 h-6 text-gray-400 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <span className="ml-3 flex-1 whitespace-nowrap">
                                                    Packs
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                               
                                                className="text-base cursor-not-allowed text-gray-500 font-normal rounded-lg hover:bg-gray-50 flex items-center p-2 group hover:text-gray-400 "
                                            >
                                                <svg
                                                    className="w-6 h-6 text-gray-400 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <span className="ml-3 flex-1 whitespace-nowrap">
                                                    Sign In
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                              
                                                className="text-base cursor-not-allowed text-gray-500 font-normal rounded-lg hover:bg-gray-50 flex items-center p-2 group hover:text-gray-400 "
                                            >
                                                <svg
                                                    className="w-6 h-6 text-gray-400 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <span className="ml-3 flex-1 whitespace-nowrap">
                                                    Sign Up
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="space-y-2 pt-2">
                                        <Link
                                            to="turneds"
                                            className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2"
                                        >
                                            <svg
                                                className="w-5 h-5 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                                                aria-hidden="true"
                                                focusable="false"
                                                data-prefix="fas"
                                                data-icon="gem"
                                                role="img"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 512 512"
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M378.7 32H133.3L256 182.7L378.7 32zM512 192l-107.4-141.3L289.6 192H512zM107.4 50.67L0 192h222.4L107.4 50.67zM244.3 474.9C247.3 478.2 251.6 480 256 480s8.653-1.828 11.67-5.062L510.6 224H1.365L244.3 474.9z"
                                                />
                                            </svg>
                                            <span className="ml-4">Turneds</span>
                                        </Link>
                                        <a
                                            onClick={onOpen}
                                            className="text-base cursor-pointer text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2"
                                        >
                                            <svg
                                                className="w-5 h-5 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                                                aria-hidden="true"
                                                focusable="false"
                                                data-prefix="fas"
                                                data-icon="plus"
                                                role="img"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 448 512"
                                            >
                                                <path fill="currentColor" d="M416 240H240V64c0-13.3-10.7-24-24-24s-24 10.7-24 24v176H32c-13.3 0-24 10.7-24 24s10.7 24 24 24h176v176c0 13.3 10.7 24 24 24s24-10.7 24-24V288h176c13.3 0 24-10.7 24-24s-10.7-24-24-24z"></path>
                                            </svg>

                                            <span className="ml-3">Create</span>
                                        </a>
                                        <Tooltip label='This can take alot of time be careful' bg='red.500' placement="right-end">
                                            <a
                                                onClick={()=>{remindPeople()}}

                                                className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-100 group transition duration-75 flex items-center p-2"
                                            >
                                                {loading ? <Spinner thickness='3px'
                                                    speed='0.35s'
                                                    
                                                /> :
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width={16}
                                                        height={16}
                                                        fill="currentColor"

                                                        className="bi bi-bell-fill w-5 h-5 text-gray-500 flex-shrink-0 group-hover:text-gray-900 transition duration-75"

                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
                                                    </svg>}

                                                <span className="ml-3">Reminder</span>

                                            </a>

                                        </Tooltip>

                                        <Link to='/logout'
                                            href="#"
                                            className="text-base text-gray-900 font-normal rounded-lg hover:bg-gray-50 hover:border flex items-center p-2 group"
                                        >
                                            <svg
                                                className="w-6 h-6 text-gray-500  flex-shrink-0 group-hover:text-gray-900 transition duration-75"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            <span className="ml-3 flex-1 whitespace-nowrap">
                                                Sign Out
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                    <div
                        className="bg-gray-900 opacity-50 hidden fixed inset-0 z-10"
                        id="sidebarBackdrop"
                    />
                    <div
                        id="main-content"
                        className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64"
                    >
                        <main>
                            <div className="pt-6 px-4">
                                <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-4">
                                    <ChartComp />
                                    <Participations />
                                </div>
                                <Stats />
                                <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4 my-4 ">
                                    <Users />
                                    <Donut/>
                                </div>


                                <Outlet />

                            </div>
                        </main>


                        <p className="text-center text-sm text-gray-500 my-10">
                            © {(new Date().getFullYear() + "-" + (new Date().getFullYear() - 1))}{" "}
                            <a className="no-underline hover:text-gray-500 ">
                                Turned
                            </a>
                            . All rights reserved.
                        </p>

                    </div>
                </div>


            </div>
        </>



    )
}