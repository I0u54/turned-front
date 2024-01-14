import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';

export default function Users(){
    let [data,setData] = useState([])
    const getData = async()=>{
        await axios.get('/latestUsers',{
            headers: {

                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        
              }
        }).then((response)=>{
            setData(response.data.data);
        })
    }
    useEffect(()=>{
        getData()
    },[])


    return(
        <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
        <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold leading-none text-gray-900">
                Latest Customers
            </h3>
            <a
                href="#"
                className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg inline-flex items-center p-2"
            >
                View all
            </a>
        </div>
        <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200">
                {data.map((d)=>(
                    <li className="py-3 sm:py-4">
                    <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                            <img
                                className="h-8 w-8 rounded-full"
                                src={"https://api.dicebear.com/7.x/micah/svg?seed="+d.id}
                                //khassni n3emer bhadchi
                                alt="Neil image"
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium capitalize text-gray-900 truncate">
                                {d.name+' '+d.lastName} 
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                                <a
                                  
                                >
                                   {d.email} 
                                </a>
                            </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900">
                            { moment(d.createdAt).fromNow()}
                        </div>
                    </div>
                </li>

                ))}
                
              
            </ul>
        </div>
    </div>

    )
}