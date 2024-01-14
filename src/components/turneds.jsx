import { useDispatch, useSelector } from 'react-redux';
import FirstSvg from './svgs/firstSvg';
import Turned from './turned';
import { useEffect, useState } from 'react';
import { fetchdarets } from '../slices/turnedSlice';
import { Link } from 'react-router-dom';
import { Box, Button, Skeleton, SkeletonCircle, SkeletonText, Stack, useToast } from '@chakra-ui/react';

export default function Turneds() {
  const dispatch = useDispatch();
  const turneds = useSelector(state => state.turned.data)
  const status = useSelector(state => state.turned.status)
  const [count, setCount] = useState(6);






  useEffect(() => {
    setTimeout(function(){

      if (status == 'idle') {

        dispatch(fetchdarets());
  
      }
    },2000)
    

  }, [status]);


  return (

    <>
      <section className="firstHomeSection">
      </section>


      <section className="secondHomeSection">



        <div className="main">
          {status !== 'idle' && turneds.length >0 ?
            turneds.slice(0, count).map((t) => (
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
            )) : (
              <>
                <Box padding='6'  bg='white'  h={"200px"} borderRadius={'8px'} boxShadow={'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em'}>
                  <SkeletonText mt='2' noOfLines={5} spacing='5' skeletonHeight='3' />
                </Box>
                <Box padding='6'  bg='white'  h={"200px"} borderRadius={'8px'} boxShadow={'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em'}>
                  <SkeletonText mt='2' noOfLines={5} spacing='5' skeletonHeight='3' />
                </Box><Box padding='6'  bg='white'  h={"200px"} borderRadius={'8px'} boxShadow={'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em'}>
                  <SkeletonText mt='2' noOfLines={5} spacing='5' skeletonHeight='3' />
                </Box><Box padding='6'  bg='white'  h={"200px"} borderRadius={'8px'} boxShadow={'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em'}>
                  <SkeletonText mt='2' noOfLines={5} spacing='5' skeletonHeight='3' />
                </Box><Box padding='6'  bg='white'  h={"200px"} borderRadius={'8px'} boxShadow={'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em'}>
                  <SkeletonText mt='2' noOfLines={5} spacing='5' skeletonHeight='3' />
                </Box><Box padding='6'  bg='white'  h={"200px"} borderRadius={'8px'} boxShadow={'rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em'}>
                  <SkeletonText mt='2' noOfLines={5} spacing='5' skeletonHeight='3' />
                </Box>

              </>
            )}
        </div>
        {count < turneds.length && (
          <Button colorScheme='BlackAlpha 100' variant='outline' onClick={() => {
            setCount((prevCount) => Math.min(prevCount + 6, turneds.length));
          }} marginTop={'10px'}>
            <i className="bi bi-three-dots"></i>
          </Button>


        )}


      </section>
    </>



  );
}
