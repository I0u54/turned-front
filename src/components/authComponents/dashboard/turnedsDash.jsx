import { Badge, Switch } from "@chakra-ui/react";
import TurnedDash from "./turnedDash";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { fetchdarets, setTurnedStatus } from "../../../slices/turnedSlice";
import { Box, Button, Stack, Tooltip, useDisclosure, useToast } from "@chakra-ui/react";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
} from '@chakra-ui/react'
import axios from "axios";

export default function TurnedsDash() {
    const dispatch = useDispatch();
    const { isOpen: alertIsOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();

    const cancelRef = useRef()
    const priceRef = useRef()
    const durationRef = useRef()
    const durationTypeRef = useRef()
    const turneds = useSelector(state => state.turned.data)
    const status = useSelector(state => state.turned.status)
    let [filtredData, setFiltredData] = useState([])
    const [selectedTurned, setSelectedTurned] = useState({})
    const [isChecked, setIsChecked] = useState(false);
    const handleChange = () => {
        setIsChecked(!isChecked);
        if (!isChecked) {

            setFiltredData(turneds.filter((t) => t.expired_at != null && new Date(t.expired_at).getTime() < new Date().getTime()));
        } else {
            setFiltredData(turneds)


        }


    };


    const toast = useToast()



    useEffect(() => {
        setFiltredData(turneds)


        if (status == 'idle') {

            dispatch(fetchdarets());

        }



    }, [status]);
    const search = (e) => {
        const { value } = e.target;
        setFiltredData(turneds.filter((t) => String(t.id).includes(value)));
    }
    const edit = async (id) => {
        await axios.get('/darets/' + id).then((response) => {
            setSelectedTurned(response.data.daret);

            onAlertOpen()
        }).catch((error) => {
            toast({
                title: error.response.data.error,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-left',
                variant: 'left-accent'
            })
        })



    }
    const ConfirmEdit = async (id) => {
        await axios.put('/darets_update/' + id, { price: priceRef.current.value, pnumber: durationRef.current.value, duration: durationRef.current.value, dtype: durationTypeRef.current.value }, {
            headers: {

                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        }).then((response) => {
            dispatch(setTurnedStatus('idle'))

            toast({
                title: response.data.message,
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-left',
                variant: 'left-accent'
            })
            onAlertClose()
        }).catch((error) => {
            onAlertClose()

            toast({
                title: error.response.data.error,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-left',
                variant: 'left-accent'
            })
            console.log(error);
        })

    }
    return (
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 max-h-[700px] overflow-y-auto scroll-none">
            <AlertDialog
                isOpen={alertIsOpen}
                leastDestructiveRef={cancelRef}
                onClose={onAlertClose}
                isCentered
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Edit a turned
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
                                        defaultValue={selectedTurned.price}
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
                                        defaultValue={selectedTurned.duration}
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
                                        <option selected value={selectedTurned.dtype} className="capitalize">{selectedTurned.dtype}</option>
                                        <option value="year" className="text-gray-500">Year</option>
                                        <option value="month" className="text-gray-500">Month</option>
                                        <option value="day" className="text-gray-500">Day</option>
                                    </select>
                                </div>



                            </form>

                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onAlertClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='yellow' ml={3} onClick={() => { ConfirmEdit(selectedTurned.id) }}>
                                Update
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <div className="relative w-full mb-3 flex justify-between items-center">
                <input
                    type="text"
                    className=" w-full backdrop-blur-sm bg-white/20 py-2 pl-10 pr-4 rounded-lg focus:outline-none border-2 border-gray-100 focus:border-cyan-600 transition-colors duration-300"
                    placeholder="Search...(By id)"
                    onKeyUp={(e) => { search(e) }}
                />
                <div>


                        <Switch
                            colorScheme="teal"
                            size="lg"
                            ml={'10px'}
                            isChecked={isChecked}
                            onChange={handleChange}
                            title={isChecked ? 'show all ' : 'only expired'}

                        />

                  


                </div>

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


            <div className="mainTurnedsDash grid grid-cols-2 gap-3">
                {filtredData.length > 0 ?
                    filtredData.map((t) => (
                        <TurnedDash
                            key={t.id}
                            data={{
                                id: t.id,
                                price: t.price,
                                expireAt: t.expired_at,
                                dType: t.dtype,
                                available: t.available,
                                duration: t.duration,
                                pNumber: t.pnumber,
                                status: t.status,
                                participations: t.participations,


                            }}
                            openEditAlert={edit}
                        />
                    )) : <h1 className="capitalize  m-5">no data found 😣</h1>

                }





            </div>
        </div>

    )
}