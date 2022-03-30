import React, { useState } from 'react'
import Image from 'next/image'

export default function Menu() {

    const [isEditMode, setIsEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = () => { }
    return (
        <div className="block mt-6 bg-white max-w-full">
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-6">
                    <label htmlFor="nama_voucher" className="form-label inline-block mb-2 text-gray-700">Nama Menu</label>
                    <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                        aria-describedby="voucher" placeholder="Nama Menu" required />
                    <small id="voucher" className="block mt-1 text-xs text-gray-600">contoh: Coca - cola</small>
                </div>
                <div className="form-group mb-6">
                    <label htmlFor="voucher_code" className="form-label inline-block mb-2 text-gray-700">Gambar</label>
                    <input type="file" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                    />
                </div>
                <div className="form-group mb-6">
                    <label htmlFor="jumlah_diskon" className="form-label inline-block mb-2 text-gray-700">Harga</label>
                    <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                        placeholder="Harga Menu" required />
                    <small id="jumlah_diskon" className="block mt-1 text-xs text-gray-600">contoh: 40000 = Rp40,000</small>
                </div>

                {isEditMode ? (
                    <button type="submit" className={`px-6 py-2.5 bg-orange-600 ${loading ? 'opacity-50 cursor-not-allowed hover:bg-orange-600 shadow-lg' : ''} text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out `} {...(loading) ? { disabled: true } : {}} onClick={(() => {
                        handleEditVoucher();
                    })}>
                        {loading ? (
                            <Image className='animate-spin' src={Spinner} width="20" height="20" alt='loading' />
                        ) : 'EDIT'}
                    </button>
                ) : (
                    <button type="submit" className={`px-6 py-2.5 bg-orange-600 ${loading ? 'opacity-50 cursor-not-allowed hover:bg-orange-600 shadow-lg' : ''} text-white font-medium text-xs leading-tight uppercase rounded shadow-md  hover:shadow-lg focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out `} {...(loading) ? { disabled: true } : {}}>
                        {loading ? (
                            <Image className='animate-spin' src={Spinner} width="20" height="20" alt='loading' />
                        ) : 'TAMBAH'}
                    </button>
                )}

                {success ? (
                    <p className='text-center mt-10 text-green-500'>Voucher Berhasil Ditambahkan!</p>
                ) : ''}
            </form>
        </div>
    )
}
