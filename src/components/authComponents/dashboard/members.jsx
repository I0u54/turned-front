import { PhoneIcon, StarIcon } from "@chakra-ui/icons";
import { Button, IconButton, Tooltip, useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'


export default function Members() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    let [data, setData] = useState([])
    let [filtredData,setFiltredData] = useState([])
    let [status,setStatus] = useState('idle')
    let [user,setUser] = useState(null)
    const toast = useToast()

    const search = (e) => {
        const { value } = e.target;
        setFiltredData(data.filter((d) => String(d.id).includes(value) || String(d.email).includes(value) || String(d.name).includes(value)));
    }
    const editUser = (id)=>{
        setUser(id)
        onOpen()

    }
    const updateUser = async (id) =>{
        await axios.put('/giveAdmin/'+id,{},{
            headers: {

                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`

            }

        }).then((response)=>{
            setStatus("idle")
            setFiltredData([])
            toast({
                title: response.data.message,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-left',
                variant: 'left-accent'
            })
            onClose()
        }).catch((error)=>{
            toast({
                title: error.response.data.error,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-left',
                variant: 'left-accent'
            })
            onClose()
        })
    }
    const getData = async () => {
        await axios.get('/allUsers', {
            headers: {

                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        }).then((response) => {
            setData(response.data.data);
            setStatus("success")
            
        })
    }
    useEffect(() => {
        if(status == "idle"){

            getData()
        }
    }, [status])

    return (
        <div className="bg-white shadow rounded-lg p-8 sm:p-6 xl:p-10 max-h-[700px] overflow-y-auto scroll-none">
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Role </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    Are you sure? You can't undo this action afterwards.
                       
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='teal' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button colorScheme='purple' onClick={()=>{updateUser(user)}}>Change Role</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <div className="relative w-full mb-3 flex justify-between items-center">
                <input
                    type="text"
                    className=" w-full backdrop-blur-sm bg-white/20 py-2 pl-10 pr-4 rounded-lg focus:outline-none border-2 border-gray-100 focus:border-cyan-600 transition-colors duration-300"
                    placeholder="Search...(By email,name)"
                   onKeyUp={(e) => { search(e) }}
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                        className="w-4 h-4 text-gray-800 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </div>





            </div>

            <div className="  max-h-[700px] overflow-y-auto scroll-none">

                <div className="flow-root">
                    <ul role="list" className=" grid grid-cols-3 gap-3">
                        {filtredData.length <= 0 ? 
                        data.map((d) => (

                            <li className="min-h-[100px] border-2 border-gray-100 rounded px-3 py-3 flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src={"https://api.dicebear.com/7.x/micah/svg?seed=" + d.id}
                                           
                                            alt="Neil image"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium capitalize text-gray-900 truncate">
                                            {d.name + " " + d.lastName}
                                        </p>

                                        <p className="text-sm text-gray-500 truncate">
                                            <a

                                            >
                                                {d.email}

                                            </a>
                                        </p>
                                    </div>

                                </div>
                                <div className="inline-flex items-center text-base font-semibold  text-gray-900">
                                    {!d.admin ?
                                        <Tooltip label='Give admin '>
                                            <span span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-600/10 hover:scale-110 cursor-pointer transition duration-200 " onClick={()=>{editUser(d.id)}}>User</span>

                                        </Tooltip> : <span className="inline-flex items-center rounded-md bg-cyan-50 px-2 py-1 text-xs font-medium text-cyan-600 ring-1 ring-inset ring-gray-500/10 hover:scale-110 cursor-pointer transition duration-200" onClick={()=>{editUser(d.id)}}>Admin</span>

                                    }

                                </div>
                            </li>
                        )) :  filtredData.map((d) => (

                            <li className="min-h-[100px] border-2 border-gray-100 rounded px-3 py-3 flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <img
                                            className="h-8 w-8 rounded-full"
                                            src={"https://api.dicebear.com/7.x/micah/svg?seed=" + d.id}
                                           
                                            alt="Neil image"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium capitalize text-gray-900 truncate">
                                            {d.name + " " + d.lastName}
                                        </p>

                                        <p className="text-sm text-gray-500 truncate">
                                            <a

                                            >
                                                {d.email}

                                            </a>
                                        </p>
                                    </div>

                                </div>
                                <div className="inline-flex items-center text-base font-semibold  text-gray-900">
                                    {!d.admin ?
                                        <Tooltip label='Give admin '>
                                            <span span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-600/10 hover:scale-110 cursor-pointer transition duration-200 " onClick={()=>{editUser(d.id)}}>User</span>

                                        </Tooltip> : <span className="inline-flex items-center rounded-md bg-cyan-50 px-2 py-1 text-xs font-medium text-cyan-600 ring-1 ring-inset ring-gray-500/10 hover:scale-110 cursor-pointer transition duration-200"  onClick={()=>{editUser(d.id)}}>Admin</span>

                                    }

                                </div>
                            </li>
                        ))
                        
                    }
                        







                    </ul>
                </div>
            </div>
        </div>
    )
}