import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import Axios from '../../../constants/Axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const Chart = () => {
    const [salesData, setSalesData] = useState({});
    const [ordersData, setOrdersData] = useState({});
    const [usersData, setUsersData] = useState({});
    const [startDate, setStartDate] = useState(new Date('2024-01-01'));
    const [endDate, setEndDate] = useState(new Date('2024-12-31'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await Axios.get('/statistics', {
                    params: {
                        start_date: startDate.toISOString().split('T')[0],
                        end_date: endDate.toISOString().split('T')[0]
                    }
                });
                const data = response.data;

                setSalesData({
                    labels: data.labels, // Dates
                    datasets: [
                        {
                            label: 'Sales',
                            data: data.sales, // Sales data
                            backgroundColor: 'rgba(75,192,192,0.6)',
                            borderColor: 'rgba(75,192,192,1)',
                            borderWidth: 1,
                        }
                    ],
                });

                setOrdersData({
                    labels: data.labels, // Dates
                    datasets: [
                        {
                            label: 'Orders',
                            data: data.orders, // Orders data
                            backgroundColor: 'rgba(153,102,255,0.6)',
                            borderColor: 'rgba(153,102,255,1)',
                            borderWidth: 1,
                        }
                    ],
                });

                setUsersData({
                    labels: data.labels, // Dates
                    datasets: [
                        {
                            label: 'Users',
                            data: data.users, // Users data
                            backgroundColor: 'rgba(255,159,64,0.6)',
                            borderColor: 'rgba(255,159,64,1)',
                            borderWidth: 1,
                        }
                    ],
                });
            } catch (error) {
                console.error('Error fetching chart data', error);
            }
        };

        fetchData();
    }, [startDate, endDate]);

    return (
        <div className="p-20 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Overview Statistics</h2>
            <div className="mb-6">
                <div className="flex space-x-4">
                    <div>
                        <label htmlFor="startDate" className="block text-gray-700">Start Date</label>
                        <DatePicker
                            id="startDate"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="yyyy-MM-dd"
                            className="border p-2 rounded"
                        />
                    </div>
                    <div>
                        <label htmlFor="endDate" className="block text-gray-700">End Date</label>
                        <DatePicker
                            id="endDate"
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            dateFormat="yyyy-MM-dd"
                            className="border p-2 rounded"
                        />
                    </div>
                </div>
            </div>
            <div className="space-y-8">
                <div className="relative h-60">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-2">Sales</h3>
                    {salesData.labels ? (
                        <Line
                            data={salesData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                    },
                                },
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: 'rgb(75, 85, 99)',
                                        },
                                    },
                                },
                            }}
                        />
                    ) : (
                        <p className="text-gray-500">Loading...</p>
                    )}
                </div>

                <div className="relative h-60">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-2">Orders</h3>
                    {ordersData.labels ? (
                        <Line
                            data={ordersData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                    },
                                },
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: 'rgb(75, 85, 99)',
                                        },
                                    },
                                },
                            }}
                        />
                    ) : (
                        <p className="text-gray-500">Loading...</p>
                    )}
                </div>

                <div className="relative h-60">
                    <h3 className="text-2xl font-semibold text-gray-700 mb-2">Users</h3>
                    {usersData.labels ? (
                        <Line
                            data={usersData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                scales: {
                                    y: {
                                        beginAtZero: true,
                                    },
                                },
                                plugins: {
                                    legend: {
                                        labels: {
                                            color: 'rgb(75, 85, 99)',
                                        },
                                    },
                                },
                            }}
                        />
                    ) : (
                        <p className="text-gray-500">Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Chart;
