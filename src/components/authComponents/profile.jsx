import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { Tabs, TabList, TabPanels, Tab, TabPanel, IconButton, Badge, Tooltip, useToast } from '@chakra-ui/react'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import { CheckIcon, RepeatIcon, ViewIcon } from "@chakra-ui/icons"
import { useDispatch, useSelector } from "react-redux"
import Turned from "../turned"
import { fetchdarets } from "../../slices/turnedSlice"
import { useLocation } from 'react-router-dom';


export default function Profile() {
    let [participations, setParticipations] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const turneds = useSelector(state => state.turned.data)
    const status = useSelector(state => state.turned.status)
    const location = useLocation();
    let [pStatus,setPsTatus] = useState('idle')
    const toast = useToast()


    const [saves, setSaves] = useState(localStorage.getItem('saves') != undefined ? JSON.parse(localStorage.getItem('saves')) : [])

    const fetchParticipations = async () => {
        await axios.get('/participations', {
            headers: {

                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`

            }
        }).then((response) => {
            setParticipations(response.data.participations);
            setPsTatus('success')
        }).catch((error) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message,

            })
        })


    }
    const reparticipate = async(id)=>{
        await axios.post('/reparticipate/'+id,{},{
            headers: {

                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`

            }

        }).then((response)=>{
            setPsTatus('idle')
            
            toast({
                title: response.data.message,
                status: 'success',
                duration: 2000,
                isClosable: true,
                position:'top-left',
                variant:'left-accent'
              })
        }).catch((error)=>{
            console.log(error);
        })
    }
    let payAll = async()=>{
        await axios.put('/pay')
      }
    useEffect(() => {
        if(pStatus == 'idle'){

            fetchParticipations()
            payAll()
        }
        if (status == 'idle') {

            dispatch(fetchdarets());

        }

        setInterval(function () {
            if (window.location.pathname == '/profile') {
                setSaves(localStorage.getItem('saves') != undefined ? JSON.parse(localStorage.getItem('saves')) : [])

            }
        }, 300)


    }, [status,pStatus])

    return (
        <>
            <section className="firstHomeSection">
            </section>



            <section className="secondHomeSection">
                <div className="mainProfile">
                    <Tabs isFitted variant='enclosed' colorScheme={'teal'}  >
                        <TabList mb='1em'>
                            <Tab fontWeight={'600'}>My Participations</Tab>
                            <Tab fontWeight={'600'}>Saves</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <TableContainer>
                                    <Table variant='simple' size={'sm'}  >
                                        <TableCaption>Turned best way to safe your money</TableCaption>
                                        <Thead>
                                            <Tr>
                                                <Th >Turned</Th>
                                                <Th>Amount</Th>
                                                <Th>Pay date</Th>
                                                <Th textAlign={'center'}>Reparticipate</Th>
                                                <Th>payed</Th>
                                                <Th isNumeric>View</Th>
                                            </Tr>
                                        </Thead>
                                        <Tbody>
                                            {participations.map((p) => {
                                                const reparticipationDate =
                                                    p.daret.dtype == 'day'
                                                        ? new Date(p.createdAt).setDate(new Date(p.createdAt).getDate() + 1)
                                                        : p.daret.dtype == 'week'
                                                            ? new Date(p.createdAt).setDate(new Date(p.createdAt).getDate() + 7)
                                                            : p.daret.dtype == 'month'
                                                                ? new Date(p.createdAt).setMonth(new Date(p.createdAt).getMonth() + 1)
                                                                : null;



                                                return (

                                                    <Tr>
                                                        <Td>T#{p.daret.id}</Td>
                                                        <Td>{p.daret.price * p.daret.pnumber * p.quantity} Dh</Td>
                                                        <Td >{p.payDate != null ? new Date(p.payDate).toLocaleDateString('en-US', {
                                                            month: 'long',
                                                            day: 'numeric',
                                                            year: 'numeric',
                                                        }) : 'waiting for activation'}</Td>
                                                        <Td textAlign={'center'}>{reparticipationDate < new Date().getTime() && new Date(p.daret.expired_at).getTime()  >= new Date().getTime()  ? 
                                                            <IconButton
                                                                isRound={true}
                                                                variant='solid'
                                                                colorScheme='teal'
                                                                aria-label='Done'
                                                                fontSize='18px'
                                                                size={'sm'}
                                                                icon={<RepeatIcon />}
                                                                onClick={()=>{reparticipate(p.id)}}
                                                            />


                                                            :
                                                            <Tooltip label={reparticipationDate > new Date().getTime() && "next participation at : " + new Date(reparticipationDate).toDateString()}>
                                                                <IconButton
                                                                    isRound={true}
                                                                    variant='solid'
                                                                    colorScheme='teal'
                                                                    aria-label='Done'
                                                                    fontSize='18px'
                                                                    icon={<RepeatIcon />}
                                                                    isDisabled={true}
                                                                    size={'sm'}

                                                                />
                                                            </Tooltip>

                                                        }</Td>
                                                        {p.payed ? <Td>  <Badge colorScheme='green'>Done</Badge></Td> : <Td>  <Badge colorScheme='red'>not yet</Badge></Td>}
                                                        <Td isNumeric><Link to={'/daret/info/' + p.daret.id}><IconButton icon={<ViewIcon />} size={'sm'} /></Link> </Td>
                                                    </Tr>

                                                );
                                            })}

                                        </Tbody>

                                    </Table>
                                </TableContainer>
                            </TabPanel>
                            <TabPanel>
                                <div className="main">
                                    {saves.length > 0 && turneds.length > 0 ? turneds.map((t) => (
                                        saves.includes(t.id) &&
                                        <Turned
                                            key={t.id}
                                            data={{
                                                id: t.id,
                                                price: t.price,
                                                expireAt: t.expired_at,
                                                dType: t.dtype,
                                                available: t.available,
                                                duration: t.duration,
                                                pNumber: t.pnumber,
                                                status: t.status
                                            }}
                                        />
                                    )) : <h3 className="text-center">No saves yet</h3>}


                                </div>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>



                </div>





            </section>
        </>

    )

}
{/* <div className="profileNav">
                    <div><h2>my participations</h2></div>
                    <div onClick={() => { navigate('/logout') }}><h2>logout</h2></div>
                </div>

                <div className="profileContent">
                    <table class="table table-borderless text-center text-capitalize">
                        <thead>
                            <tr>
                                <th>turned</th>
                                <th>amount</th>
                                <th>pay date</th>
                                <th>Reparticipate</th>
                                <th>payed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {participations.map((p) => {
                                const reparticipationDate =
                                    p.daret.dtype == 'day'
                                        ? new Date(p.createdAt).setDate(new Date(p.createdAt).getDate() + 1)
                                        : p.daret.dtype == 'week'
                                            ? new Date(p.createdAt).setDate(new Date(p.createdAt).getDate() + 7)
                                            : p.daret.dtype == 'month'
                                                ? new Date(p.createdAt).setMonth(new Date(p.createdAt).getMonth() + 1)
                                                : null;



                                return (
                                    <tr>
                                        <td>#T{p.daret.id}</td>
                                        <td>{p.daret.price * p.daret.pnumber * p.quantity} MAD</td>
                                        <td>{p.payDate != null ? new Date(p.payDate).toLocaleDateString() : 'waiting for activation'}</td>
                                        <td>{reparticipationDate < new Date().getTime() ? <button className="btn  text-light" ><i className="bi bi-repeat"></i></button> : <button className="btn  text-light" style={{ cursor: "not-allowed",backgroundColor:"#05966954" }} title={"next participation at : " + new Date(reparticipationDate).toDateString()}><i className="bi bi-repeat"></i></button>}</td>
                                       {p.payed ? <td style={{color:"#059669"}}>done</td>: <td style={{color:"#fd7e14"}}>not yet</td> } 
                                    </tr>
                                );
                            })}
                        </tbody>

                    </table>

                </div> */}