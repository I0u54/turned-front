import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Chart, registerables } from 'chart.js';
import { useEffect, useState } from 'react';
import axios from 'axios';



Chart.register(...registerables);
Chart.register(ChartDataLabels);
export default function Donut() {
    const [data,setData] = useState({})
    const getData = async()=>{
        await axios.get('/generalStats',{
            headers: {

                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        
              }
        }).then((response)=>{
            setData(response.data.data);
        })
    }
   


    const chartData = {
        labels:['Active','Inactive'],
        datasets: [
            {

                data: [data.activeUsers,data.usersCount - data.activeUsers],
                backgroundColor: ['#0e7490d9', '#05BEC1'],
                borderColor: 'whitesmoke', 
                borderWidth: 2,




            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        rotation: Math.floor(Math.random()*360),
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 15,
                }
            },
            title: {
                display: true,
             
            },
            datalabels: {
                display: false,

                color: 'black',
              


            },

        }
    };
    useEffect(()=>{
        getData()
    },[])

    return (
        
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  ">
            <h3 className="text-xl leading-none font-bold text-gray-900 mb-10">
                Users Overview 
            </h3>
            <div className="h-[500px] mt-10">

                <Doughnut data={chartData} options={chartOptions} />
            </div>

        </div>
    )
}