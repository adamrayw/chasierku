import Head from 'next/head'
import React from 'react'
import NavbarC from '../components/Navbar'

export default function statistik() {
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
                        <h2 className='text-xl font-semibold text-gray-700'>Total Income</h2>
                    </div>
                    <div className='shadow rounded-lg bg-white p-4 space-y-4'>
                        <p className='text-2xl text-green-400'>12412</p>
                        <h2 className='text-xl font-semibold text-gray-700'>Total Transaction</h2>
                    </div>
                    <div className='shadow rounded-lg bg-white p-4 space-y-4'>
                        <p className='text-2xl text-green-400'>122</p>
                        <h2 className='text-xl font-semibold text-gray-700'>Total Transaction Today</h2>
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
                                <tr className='text-gray-500'>
                                    <td>
                                        1x Ice Coffee, 2x Ice Tea
                                    </td>
                                    <td>
                                        Gopay
                                    </td>
                                    <td>
                                        +Rp21.222
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <NavbarC />
            </div>
        </div>

    )
}
