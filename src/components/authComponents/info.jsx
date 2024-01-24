import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Turned from "../turned";
import axios from "axios";
import Swal from "sweetalert2";
import { Button, Select, useToast } from "@chakra-ui/react";
import { ChevronDownIcon } from '@chakra-ui/icons';
import { setTurnedStatus } from "../../slices/turnedSlice";
import mp from '../assets/sound.mp3'


export default function Info() {
    const { id } = useParams();
    const navigate = useNavigate();
    let [turned, serTurned] = useState({})
    let [zone,setZone] = useState()
    let [status, setStatus] = useState('idle')
    const amountRef = useRef(null)
    const toast = useToast()
    const dispatch = useDispatch()
    let audioRef = useRef(null)



    const participate = async () => {
        await axios.post('/participate', { quantity: amountRef.current.value, idDaret: turned.id }, {
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
                position:'top-left',
                variant:'left-accent'
              })
            setStatus('idle')
            audioRef.current.play()

        }).catch((error) => {
            toast({
                title: "error",
                status: 'error',
                duration: 2000,
                isClosable: true,
                position:'top-left',
                variant:'left-accent'
              })
            
        })

    }
    const confirmParticipation = (e) => {
        e.preventDefault()
        Swal.fire({
            title: 'Are you sure?',
            text: "We'll take the money  from your bank account",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, take it!'
        }).then(async (result) => {
            if (result.isConfirmed) {

                participate()
            }

        })
    }

    useEffect(() => {
        if (status == 'idle') {
            axios.get('/darets/' + id).then((response) => {
                serTurned(response.data.daret)
                setZone(response.data.daret.dtype === 'day'
                ? new Date().setDate(new Date().getDate() + 1)
                : response.data.daret.dtype === 'week'
                ? new Date().setDate(new Date().getDate() + 7)
                : response.data.daret.dtype === 'month'
                ? new Date().setMonth(new Date().getMonth() + 1)
                : null)
                setStatus('success')
            }).catch(() => {
                navigate('/')
            })

        }
    }, [status])

    return (
        <section className="secondHomeSection">
             <audio ref = {audioRef}src={mp}></audio>
            <div className="turnedInfo">

                <Turned

                    data={{
                        id: turned.id,
                        price: turned.price,
                        expireAt: turned.expired_at,
                        dType: turned.dtype,
                        available: turned.available,
                        duration: turned.duration,
                        pNumber: turned.pnumber,
                        status: turned.status
                    }}
                />



                <div className="participants">
                  
                    
                    {turned && turned.participations && turned.participations.map((p) => (
                        
                        <div className={"participant" + (p.payDate != null && new Date(p.payDate).getTime() <= zone && !p.payed ? " bg-green-100" : ' bg-gray-100')}>
                            
                            <h1>#{p.user.name + " " + p.user.lastName} has participated with {p.quantity == 1 ? 'full' : p.quantity == 0.5 ? 'half' : 'quarter'} turned {p.payDate != null && new Date(p.payDate).getTime() <= zone && !p.payed && " ( its my turn )"}  <span className="text-green-400">{p.payed && "( payed )"}</span> </h1>
                        </div>
                    ))}
                </div>
                {turned && turned.available > 0 && <div className="makeParticipation">

                    <form>
                        <Select ref={amountRef} >
                            <option value="1">full turned</option>
                            <option value="0.5">half turned</option>
                            <option value="0.25">quarter turned</option>
                        </Select>
                        {/* <select className="form-control" >
                            
                        </select> */}
                        <Button colorScheme='teal' variant='outline' onClick={(e) => { confirmParticipation(e) }}>
                            Participate 
                        </Button>
                        
                    </form>


                </div>}

            </div>


        </section>
    );
}
