import { ArrowForwardIcon, ChevronRightIcon } from "@chakra-ui/icons";
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
import { Fade, ScaleFade, Slide, SlideFade, Collapse } from '@chakra-ui/react'
import axios from "axios";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setTurnedStatus } from "../../../slices/turnedSlice";

export default function TurnedDash({ data, openEditAlert }) {
    const expired_at = data.expireAt
    const pNumber = data.pNumber
    const available = data.available
    const duration = data.duration
    const dType = data.dType
    const price = data.price
    const id = data.id
    const status = data.status
    const participations = data.participations
    const { isOpen: alertIsOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
    const { isOpen: collapseIsOpen, onToggle: onCollapseToggle } = useDisclosure();

    const dispatch = useDispatch()
    const toast = useToast()

    const destroyTurned = async (id) => {
        await axios.delete('/daretDelete/' + id, {
            headers: {

                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        }).then((response) => {
            onAlertClose()
            dispatch(setTurnedStatus('idle'))

            toast({
                title: response.data.message,
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top-left',
                variant: 'left-accent'
            })
        }).catch((error) => {
            toast({
                title: error.response.data.error,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top-left',
                variant: 'left-accent'
            })
        })

    }
    const endTurned = async (id) => {
        await axios.post('/endDaret/' + id, {}, {
            headers: {

                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        }).then((response) => {
            onAlertClose()
            dispatch(setTurnedStatus('idle'))

            toast({
                title: response.data.message,
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top-left',
                variant: 'left-accent'
            })
        }).catch((error) => {
            toast({
                title: error.response.data.error,
                status: 'error',
                duration: 2000,
                isClosable: true,
                position: 'top-left',
                variant: 'left-accent'
            })
        })


    }
    const destroyParticipation = async (id) => {
        await axios.delete('/participationDelete/' + id, {
            headers: {

                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        }).then((response) => {
            dispatch(setTurnedStatus('idle'))

            toast({
                title: response.data.message,
                status: 'success',
                duration: 2000,
                isClosable: true,
                position: 'top-left',
                variant: 'left-accent'
            })
        }).catch((error) => {
            toast({
                title: error.response.data.error + "(turned already has been activated)",
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'top-left',
                variant: 'left-accent'
            })
        })

    }


    const cancelRef = useRef()
    return (
        <div className="min-h-[180px] border-2 border-gray-100 rounded px-3 py-3">
            <AlertDialog
                isOpen={alertIsOpen}
                leastDestructiveRef={cancelRef}
                onClose={onAlertClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Turned
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onAlertClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={() => { destroyTurned(id) }} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
            <div className="flex justify-between">

                <Stack direction='row'>
                    <span className="inline-flex items-center rounded-md bg-cyan-50 px-2 py-1 text-xs font-medium text-cyan-600 ring-1 ring-inset ring-gray-500/10">tunred</span>
                    <span className={available <= 0 ? "inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-600 ring-1 ring-inset ring-gray-500/10" : "inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-600 ring-1 ring-inset ring-gray-500/10"}>{available <= 0 ? "Unavailable" : "Available"}</span>
                    <span className={status == 'activated' ? "inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600 ring-1 ring-inset ring-gray-500/10" : "inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10"}>{status}</span>
                    <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 "><i className="bi bi-megaphone-fill" style={{ fontSize: "15px", color: "#059669" }}></i></span>
                </Stack>
                <div>


                    {status != 'activated' && participations.length == 0 ? <span class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20 hover:scale-110 cursor-pointer transition duration-200 mr-1" onClick={() => { openEditAlert(id) }}><i className="bi bi-pencil-fill"></i></span> :
                        <Tooltip label='You are not allowed to edit an activated turned or a turned who has participations'>

                            <span class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-200 ring-1 ring-inset ring-yellow-600/20  cursor-not-allowed  mr-1" ><i className="bi bi-pencil-fill"></i></span>
                        </Tooltip>}

                    {status != 'activated' && participations.length == 0 ? <span span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 hover:scale-110 cursor-pointer transition duration-200 " onClick={onAlertOpen}><i className="bi bi-trash3-fill text-red-600"></i></span> :
                        <Tooltip label='You are not allowed to delete an activated turned or a turned who has participations'>

                            <span span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-300 ring-1 ring-inset ring-red-600/10  cursor-not-allowed" ><i className="bi bi-trash3-fill"></i></span>
                        </Tooltip>}


                    {
                        expired_at !== null && new Date(expired_at).getTime() < new Date().getTime() && status !== "expired" && (
                            <Tooltip label="Close this turned">
                                <span
                                    className="inline-flex ml-1 items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10 hover:scale-110 cursor-pointer transition duration-200"
                                    onClick={() => {
                                        endTurned(id);
                                    }}
                                >
                                    <i className="bi bi-stopwatch-fill"></i>
                                </span>
                            </Tooltip>
                        )
                    }



                </div>



            </div>
            <h6 className="font-semibold mt-2">T#{id}:</h6>
            <p className="mt-2 text-[15px]">
                This offer is valid until {expired_at != null ? new Date(expired_at).toLocaleString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                }) : "'unknown'"} with a maximum of {pNumber} participants. Currently, {available <= 0 ? 'No' : available} slots are available. The duration of this opportunity spans {duration} {dType}s, and the cost for each participation is {price} MAD .
            </p>
            {participations.length > 0 &&
                <>

                    <Box color='teal.400' cursor={'pointer'} onClick={onCollapseToggle} fontWeight='bold' marginTop='10px' >
                        See Participations  <ChevronRightIcon /></Box>
                    <Collapse in={collapseIsOpen} animateOpacity>
                        <Box
                            p='30px'
                            mt='4'

                            rounded='md'
                            shadow='md'
                            w="100%"
                        >
                            <div className="w-full grid grid-cols-2 gap-3  ">
                                {participations.map((p) => {
                                    return (
                                        <>

                                            <div onClick={() => { destroyParticipation(p.id) }} className="relative h-[130px] p-1 bg-gray-100 text-center text-[14px] cursor-pointer rounded flex items-center justify-center hover:border-red-100 hover:border-2 group hover:text-gray-400"><span>#<span className="font-semibold">{p.user.name + " " + p.user.lastName}</span> has participated with {p.quantity == 1 ? 'full' : p.quantity == 0.5 ? 'half' : 'quarter'} turned</span>


                                                <i className="bi bi-trash3-fill absolute  mx-auto text-red-600 hidden group-hover:block"></i>

                                            </div>
                                        </>
                                    )
                                })}


                            </div>
                        </Box>
                    </Collapse>
                </>}


        </div>

    )
}