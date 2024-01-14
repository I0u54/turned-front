import { useDispatch, useSelector } from 'react-redux';
import FirstSvg from './svgs/firstSvg';
import Turned from './turned';
import { useEffect, useState } from 'react';
import { fetchdarets } from '../slices/turnedSlice';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const dispatch = useDispatch();
  const turneds = useSelector(state => state.turned.data)
  const status = useSelector(state => state.turned.status)
  const [count, setCount] = useState(9);
  const navigate = useNavigate()


  useEffect(() => {
    if (status == 'idle') {

      dispatch(fetchdarets());
    }
  }, [status]);


  return (
   

    <div className='about'>

      <div className='div'>
        <h1 >Turned best way to safe your <span style={{color:"#0FA1A5"}}>money</span></h1>
        <p>The optimal approach to safeguarding your money <br /> is by creating a well-structured savings plan.</p>
        <div className='smallTags mt-4'>
         <Link to='turneds'><div className="tag">Get Started <i className="bi bi-arrow-right-short"></i></div></Link> 
          <div className="tag"><i className="bi bi-github"></i>&nbsp;Github</div>
        </div>
      </div>
      
    </div>
  );
}
