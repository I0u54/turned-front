import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import { useEffect, useState } from 'react';
import { Bar as BarChart, Line } from 'react-chartjs-2';
Chart.register(...registerables);
export default function ChartComp(){

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


    let [turnedsCount, setTurnedsCount] = useState([])
    const chartData2 = {
        labels: turnedsCount.map((c) => {
            return months[c.month - 1]
        }),
        datasets: [
            {

                data: turnedsCount.map((c) => {
                    return c.count
                }),
                backgroundColor: ['#fff'],
                borderColor: '#0891B2', 
                cubicInterpolationMode: 'monotone',
                borderWidth: 4,

            },
        ],


    }
    const chartOptions2 = {
        responsive: true,
        maintainAspectRatio: false,
        fullWidth: true,
        fullHeight: true,
        plugins: {
            //   title: {
            //     display: true,

            //     font: { size: 15, weight: 'bold', family: 'Cairo' },
            //     align: 'end',
            //     color: 'black'
            //   },
            legend: { display: false },

            datalabels: {
                display: false,

            },

        },
        scales: {
            x: {
                grid: { display: false }
            }, y: {
                grid: { display: false }
            }
        }





    };
    const getData = async()=>{
        await axios.get('/daretsPerMonth',{
            headers: {

                Authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        
              }
        }).then((response)=>{
            setTurnedsCount(response.data.data);
        })
    }
    useEffect(()=>{
        getData()
    },[])
    return(
        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8  2xl:col-span-2">
        <div className="flex items-center justify-between mb-4">
            <div className="flex-shrink-0">
                <span className="text-2xl sm:text-3xl leading-none font-bold text-gray-900">
                    Year:{new Date().getFullYear()}
                </span>
                <h3 className="text-base mt-2 font-normal text-gray-500">
                    Turneds per month   
                </h3>
            </div>
            <div className="flex items-center justify-end flex-1 text-green-500 text-base font-bold">
                12.5%
                <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
        </div>
        <div className="h-[500px] mt-10">

            <Line data={chartData2} options={chartOptions2} />
        </div>
    </div>
    )
}