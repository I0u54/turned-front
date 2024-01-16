import { ArrowForwardIcon } from "@chakra-ui/icons"
import { Box, Tooltip } from "@chakra-ui/react"
import { useState } from "react";
import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom';


export default function Turned({ data }) {
  const expired_at = data.expireAt
  const pNumber = data.pNumber
  const available = data.available
  const duration = data.duration
  const dType = data.dType
  const price = data.price
  const id = data.id
  const status = data.status
  const location = useLocation();
  const [saves,setSaves] = useState(localStorage.getItem('saves') != undefined ? JSON.parse(localStorage.getItem('saves')) : [])

  const saveLater = (e,id)=>{
    let array = []
    if(localStorage.getItem('saves') != undefined){
      array = JSON.parse(localStorage.getItem('saves'))
      for(let x in array){
        if (array[x] == id){
          
          array.splice(x,1)
          e.target.classList.remove('bi-bookmark-fill')
          e.target.classList.add('bi-bookmark')

      
          localStorage.setItem('saves',JSON.stringify(array))

          return 


        }
      }
    }
    
   array.push(id)
   e.target.classList.remove('bi-bookmark')
   e.target.classList.add('bi-bookmark-fill')
   localStorage.setItem('saves',JSON.stringify(array))
    

  }

  return (
    <div className='div'>
      <div className='spans mb-2'>
        <div>
          <span style={{ marginRight: "5px" }}>Turned</span>
          <span style={{ marginRight: "5px" }}>{available <= 0 ? "Unavailable" : "Available"}</span>
          <span style={{ marginRight: "5px" }}>{status}</span>
          {available <= 0 ? <span><i className="bi bi-dash-circle-fill" style={{ fontSize: "15px", color: "#D80027" }}></i></span>
            : <span><i className="bi bi-megaphone-fill" style={{ fontSize: "15px", color: "#059669" }}></i></span>
          }

        </div>
       
        {saves.includes(id) ?   <Tooltip label='unsave' fontSize='md'><i className="bi bi-bookmark-fill"  onClick={(e)=>{saveLater(e,id)}}></i></Tooltip> : <Tooltip label='Save for later' fontSize='md'><i className="bi bi-bookmark"  onClick={(e)=>{saveLater(e,id)}}></i></Tooltip> }
       
          
        

      </div>
      <p>
        <span style={{ fontWeight: "600" }}>T#{id}:</span> <br />

        This offer is valid until {expired_at != null ? new Date(expired_at).toLocaleString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }) : "'unknown'"} with a maximum of {pNumber} participants. Currently, {available <= 0 ? 'No' : available} slots are available. The duration of this opportunity spans {duration} {dType}s, and the cost for each participation is {price} MAD .
        {window.location.pathname == '/turneds' || window.location.pathname == '/profile'  ? <Link to={'/daret/info/' + id}><Box color='teal.400' href='#' fontWeight='bold' marginTop='10px' >
          See more informations <ArrowForwardIcon />
        </Box></Link> : ''}




      </p>

    </div>
  );
}
