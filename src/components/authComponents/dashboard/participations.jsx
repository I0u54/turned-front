import axios from "axios"
import { useEffect, useState } from "react";


export default function Participations(){
    let [participations,setParticipations] = useState([])

    const fetchParticipations = async()=>{
        await axios.get('/allParticipations',{
            headers: {

                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        
              }
        }).then((response)=>{
            setParticipations(response.data.participations);
        })
    }
    useEffect(()=>{
        fetchParticipations()
    },[])

    return(
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 2xl:col-span-2">
                                        <div className="mb-4 flex items-center justify-between">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                    Latest Participations
                                                </h3>
                                                <span className="text-base font-normal text-gray-500">
                                                    This is a list of latest participations
                                                </span>
                                            </div>
                                           
                                        </div>
                                        <div className="flex flex-col mt-8">
                                            <div className="overflow-x-auto rounded-lg">
                                                <div className="align-middle inline-block min-w-full">
                                                    <div className="shadow overflow-hidden sm:rounded-lg">
                                                        <table className="min-w-full divide-y divide-gray-200 ">
                                                            <thead className="bg-gray-50">
                                                                <tr className="">
                                                                    <th
                                                                        scope="col"
                                                                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                                    >
                                                                        Participation
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                                    >
                                                                        Date &amp; Time
                                                                    </th>
                                                                    <th
                                                                        scope="col"
                                                                        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                                                    >
                                                                        Amount
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="bg-white">
                                                                {participations.map((p)=>(
                                                                     <tr className="even:bg-gray-50 odd:bg-white">
                                                                     <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
                                                                         Participation from{" "}
                                                                         <span className="font-semibold ">
                                                                            {p.user.name + ' ' + p.user.lastName}
                                                                         </span>
                                                                     </td>
                                                                     <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-500">
                                                                         {new Date(p.createdAt).toLocaleDateString('en-US', {
                                                                    month: 'long',
                                                                    day: 'numeric',
                                                                    year: 'numeric',
                                                                })}
                                                                            </td>
                                                                     <td className="p-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                                        {p.daret.price * p.quantity} Dh
                                                                     </td>
                                                                 </tr>

                                                                ))}
                                                               
                                                               
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

    )
}