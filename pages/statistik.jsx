import axios from 'axios'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import NavbarC from '../components/Navbar'

export default function Statistik() {
    const [cookie, setCookie] = useCookies(["user"]);
    const [transaction, setTransaction] = useState([]);
    const [totalTransaction, setTotalTransaction] = useState([]);

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
            const response = await axios.get('/api/transactions/' + cookie.user.data.id);
            setTransaction(response.data.data);
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <Head>
                <title>Statistic</title>
            </Head>
            <div className='p-10'>
                <div className='text-3xl font-bold text-gray-700'>Statistic</div>
                <div className="3_screens bg-orange-500 grid grid-cols-3 mt-4 p-10 rounded gap-4 text-center">
                    <div className='shadow rounded-lg bg-white p-4 space-y-4'>
                        <p className='text-2xl text-green-400'>Rp12.412.512</p>
                        <h2 className='text-xl font-semibold text-gray-700'>Total Pendapatan</h2>
                    </div>
                    <div className='shadow rounded-lg bg-white p-4 space-y-4'>
                        <p className='text-2xl text-green-400'>{transaction.length}</p>
                        <h2 className='text-xl font-semibold text-gray-700'>Total Transaksi</h2>
                    </div>
                    <div className='shadow rounded-lg bg-white p-4 space-y-4'>
                        <p className='text-2xl text-green-400'>{totalTransaction.length}</p>
                        <h2 className='text-xl font-semibold text-gray-700'>Total Transaksi Hari Ini</h2>
                    </div>
                </div>
                <div className="last_transaction mt-10">
                    <h2 className='font-medium text-xl text-gray-700'>Last Transaction</h2>
                    <div>
                        <table className='w-full text-left mt-6'>
                            <thead>
                                <tr className='text-gray-700'>
                                    <th>Item</th>
                                    <th>Payment Method</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transaction.map((item) => {
                                    const menu = JSON.parse(item.menu)
                                    return (
                                        <tr className='text-gray-500 py-6' key={item.id}>
                                            <td className='flex text-ellipsis'>
                                                {menu.map((item, index) => {
                                                    return (
                                                        <p className='pr-4' key={index}>
                                                            {item.name}
                                                        </p>
                                                    )
                                                })}
                                            </td>
                                            <td>
                                                Gopay
                                            </td>
                                            <td>
                                                +Rp{new Intl.NumberFormat(['ban', 'id']).format(item.total)}
                                            </td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>
                    </div>
                </div>

                <NavbarC />
            </div>
        </div>

    )
}
