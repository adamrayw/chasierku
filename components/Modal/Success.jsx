import React from 'react'
import { useState } from 'react';
import Image from 'next/image';

function Success(props) {
    const [pendapatan, setPendapatan] = useState(props.data);

    return (

        <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-10 overflow-y-auto">
            <div className="modal-content p-10 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h2 className='text-xl mt-4 mb-2 font-bold text-gray-800'>Pembayaran Berhasil</h2>
                <p className=' text-sm text-gray-400'><span className='font-bold text-orange-500'>Keren!</span> Pendapatan mu bertambah</p>
                <p className='mt-2'>+Rp{new Intl.NumberFormat(['ban', 'id']).format(pendapatan)}</p>
            </div>
        </div >
    )
}

export default Success