import axios from 'axios'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import NavbarC from '../components/Navbar'

export default function Laporan() {
    const [cookie, setCookie] = useCookies(["user"]);
    const [transaction, setTransaction] = useState([]);
    const [totalTransaction, setTotalTransaction] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getStat();
        getTotalTransactionToday();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const getTotalTransactionToday = async () => {
        try {
            const response = await axios.get('/api/transactions/today/' + cookie.user.data.id);
            setTotalTransaction(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }

    const getStat = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/transactions/' + cookie.user.data.id);
            setTransaction(response.data.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }


    return (
        <div>
            <Head>
                <title>Statistic</title>
            </Head>
            <div>
                <div className='p-10 bg-orange-500 rounded-b-3xl'>
                    <div className='text-3xl font-bold text-white'>Laporan Transaksi</div>
                    <div className="3_screens grid grid-cols-3 py-10 rounded gap-4 text-center">
                        <div className='shadow-lg hover:shadow-xl transition duration-300 border rounded-lg bg-white p-4 space-y-4'>
                            <h2 className='text-2xl font-medium text-orange-500'>Total Pendapatan</h2>
                            <p className='text-2xl font-semibold text-green-400'>Rp{new Intl.NumberFormat(['ban', 'id']).format(cookie.income)}</p>
                        </div>
                        <div className='shadow-lg hover:shadow-xl transition duration-300 border rounded-lg bg-white p-4 space-y-4'>
                            <h2 className='text-2xl font-medium text-orange-500'>Total Transaksi</h2>
                            <p className='text-2xl font-semibold text-green-400'>{transaction.length}</p>
                        </div>
                        <div className='shadow-lg hover:shadow-xl transition duration-300 border rounded-lg bg-white p-4 space-y-4'>
                            <h2 className='text-2xl font-medium text-orange-500'>Transaksi Hari Ini</h2>
                            <p className='text-2xl font-semibold text-green-400'>{totalTransaction.length}</p>
                        </div>
                    </div>
                </div>
                <div className="last_transaction mt-10 px-10">
                    <h2 className='font-bold text-2xl text-gray-600 mb-4'>Transaksi Terakhir</h2>
                    <div className='h-80 overflow-auto'>
                        <table className='w-full text-left mt-6'>
                            <thead>
                                <tr className='text-xl text-gray-700 border-b'>
                                    <th className='sticky top-0 bg-white'>Menu</th>
                                    <th className='sticky top-0 bg-white'>Metode Pembayaran</th>
                                    <th className='sticky top-0 bg-white'>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <>
                                        <tr className='text-gray-500' >
                                            <td className='flex text-ellipsis my-4'>
                                                <div className='h-4 w-full bg-gray-300 animate-pulse mr-4'></div>
                                            </td>
                                            <td>
                                                <div className='h-4 w-14 bg-gray-300 animate-pulse mr-4'></div>
                                            </td>
                                            <td>
                                                <div className='h-4 w-14 bg-gray-300 animate-pulse mr-4'></div>
                                            </td>
                                        </tr>
                                        <tr className='text-gray-500' >
                                            <td className='flex text-ellipsis my-4'>
                                                <div className='h-4 w-full bg-gray-300 animate-pulse mr-4'></div>
                                            </td>
                                            <td>
                                                <div className='h-4 w-14 bg-gray-300 animate-pulse mr-4'></div>
                                            </td>
                                            <td>
                                                <div className='h-4 w-14 bg-gray-300 animate-pulse mr-4'></div>
                                            </td>
                                        </tr>
                                        <tr className='text-gray-500' >
                                            <td className='flex text-ellipsis my-4'>
                                                <div className='h-4 w-full bg-gray-300 animate-pulse mr-4'></div>
                                            </td>
                                            <td>
                                                <div className='h-4 w-14 bg-gray-300 animate-pulse mr-4'></div>
                                            </td>
                                            <td>
                                                <div className='h-4 w-14 bg-gray-300 animate-pulse mr-4'></div>
                                            </td>
                                        </tr>
                                    </>

                                ) : (
                                    <>
                                        {transaction.map((item) => {
                                            const menu = JSON.parse(item.menu)
                                            return (
                                                <tr className='text-gray-500' key={item.id}>
                                                    <td className='flex text-ellipsis my-4'>
                                                        {menu.map((item, index) => {
                                                            return (
                                                                <p className='pr-4' key={index}>
                                                                    {item.name}
                                                                </p>
                                                            )
                                                        })}
                                                    </td>
                                                    <td>
                                                        {item.payment_method}
                                                    </td>
                                                    <td>
                                                        +Rp{new Intl.NumberFormat(['ban', 'id']).format(item.total)}
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </>

                                )}


                            </tbody>
                        </table>
                    </div>
                </div>

                <NavbarC />
            </div>
        </div>

    )
}
