import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from '../../public/assets/spinner.png';
import Image from 'next/image';
import Edit from '../../public/assets/edit.png';
import Delete from '../../public/assets/delete.png';
import { useCookies } from 'react-cookie';

export default function Voucher() {

    const [cookie, setCookie] = useCookies(['user'] ?? '');

    if (cookie === undefined) {
        alert('Silahkan login terlebih dahulu');
    }
    const [voucher, setVoucher] = useState({
        id: '',
        voucher_name: '',
        voucher_code: '',
        disc: '',
    })
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [getVoucher, setGetVoucher] = useState([])
    const [isDeleteVoucher, setIsDeleteVoucher] = useState(false);
    const [deletedVoucherName, setDeletedVoucherName] = useState([]);
    const [loadingDeleteVoucher, setLoadingDeleteVoucher] = useState(false);
    const [skeletonLoading, setSkeletonLoading] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const data = {
        user_id: cookie.user.data.id ?? '',
        voucher_name: voucher.voucher_name,
        voucher_code: voucher.voucher_code,
        disc: voucher.disc,
    }

    useEffect(() => {
        getVouchers();
    }, [getVouchers])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getVouchers = async () => {
        try {
            setSkeletonLoading(true);
            const response = await axios.get('/api/voucher/' + cookie.user.data.id);
            setGetVoucher(response.data.data.vouchers);
            setSkeletonLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteVoucher = async (voucher) => {
        try {
            setLoadingDeleteVoucher(true);
            const response = await axios.delete('/api/voucher/' + voucher.id + '/delete');
            getVouchers();
            setIsDeleteVoucher(false);
            setDeletedVoucherName([]);
            setLoadingDeleteVoucher(false);
        } catch (error) {
            console.log(error);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            axios.get('/sanctum/csrf-cookie')
            const response = await axios.post('api/voucher/store', data);
            const result = response;
            setLoading(false);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 3000);
            setVoucher({ ...voucher, voucher_name: '', voucher_code: '', disc: '' })
            getVouchers();
        } catch (error) {
            console.log(error);
            setLoading(false);
        }

    }

    const handleEditVoucher = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/voucher/' + voucher.id + '/edit', data);
            setLoading(false);
            setIsEditMode(false);
            setVoucher({ ...voucher, id: '', voucher_name: '', voucher_code: '', disc: '' })
            setLoading(false);
            getVouchers();
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <div className='py-6'>
            <div className='mb-6'>
                {/* <h1 className='text-xl font-bold mb-2 text-gray-700'>Voucher Aktif</h1> */}
                <div className='overflow-auto h-40 w-auto'>
                    <table>
                        <thead>
                            <tr>
                                <th className='sticky w-full top-0 pr-4 bg-white'>
                                    Name
                                </th>
                                <th className='sticky w-full top-0 pr-4 bg-white'>
                                    Code
                                </th>
                                <th className='sticky w-full top-0 pr-4 bg-white'>
                                    Discount
                                </th>
                                <th className='sticky w-full z-50 top-0 pr-4 bg-white'>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {skeletonLoading ? (
                                <tr>
                                    <td className='py-4 pr-4'>
                                        <div className='h-5 w-full bg-gray-500 rounded-lg animate-pulse'></div>
                                    </td>
                                    <td className='py-4 pr-4'>
                                        <div className='h-5 w-full bg-gray-500 rounded-lg animate-pulse'></div>
                                    </td>
                                    <td className='py-4 pr-4'>
                                        <div className='h-5 w-full bg-gray-500 rounded-lg animate-pulse'></div>
                                    </td>
                                    <td className='py-4 pr-4 space-x-2 flex items-center justify-center'>

                                        <button>
                                            <Image src={Edit} width={20} height={20} alt="edit" />
                                        </button>
                                        <button>
                                            <Image src={Delete} width={20} height={20} alt="delete" onClick={(() => {
                                                setDeletedVoucherName(voucher);
                                                setIsDeleteVoucher(true);
                                            })} />
                                        </button>
                                    </td>
                                </tr>
                            ) : null}
                            {getVoucher.map((voucher, index) => {
                                return (
                                    <tr key={index}>
                                        <td className='py-4 pr-4'>{voucher.voucher_name}</td>
                                        <td className='py-4 pr-4'>{voucher.voucher_code}</td>
                                        <td className='py-4 pr-4'>{voucher.disc}%</td>
                                        <td className='py-4 pr-4 space-x-2 flex items-center'>
                                            {isEditMode ? (
                                                <button onClick={() => {
                                                    setIsEditMode(false);
                                                    setVoucher({ ...voucher, voucher_name: '', voucher_code: '', disc: '' })
                                                }}>
                                                    X
                                                </button>
                                            ) : (
                                                <button>
                                                    <Image src={Edit} width={20} height={20} alt="edit" onClick={(() => {
                                                        setVoucher({ ...voucher, id: voucher.id, voucher_name: voucher.voucher_name, voucher_code: voucher.voucher_code, disc: voucher.disc })
                                                        setIsEditMode(true);
                                                    })} />
                                                </button>
                                            )}

                                            <button>
                                                <Image src={Delete} width={20} height={20} alt="delete" onClick={(() => {
                                                    setDeletedVoucherName(voucher);
                                                    setIsDeleteVoucher(true);
                                                })} />
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                            {skeletonLoading ? null : (
                                <>
                                    {
                                        getVoucher.length < 1 ? (
                                            <tr>
                                                <td className='py-4 pr-4' colSpan={4}>
                                                    <div className='text-center'>
                                                        <p className='text-gray-700'>Tidak ada voucher</p>
                                                    </div>
                                                </td>
                                            </tr>
                                        ) : null
                                    }
                                </>
                            )}


                        </tbody>
                    </table>
                </div>
            </div>
            {isDeleteVoucher ? (
                <div className='bg-orange-500 text-white px-4 py-4'>
                    <p className=' text-center'>
                        {` Yakin ingin delete voucher ${deletedVoucherName.voucher_name}?`}
                    </p>
                    <div className='flex items-center mt-4 justify-around'>
                        {loadingDeleteVoucher ? (
                            <Image className='animate-spin ' src={Spinner} width={20} height={20} alt="spinner" />
                        ) : (
                            <>
                                <button className='bg-white text-red-500 px-4 py-2 shadow-sm rounded-md mt-2 hover:bg-gray-50 active:bg-gray-500' onClick={() => handleDeleteVoucher(deletedVoucherName)}>Ya, yakin</button>
                                <button className='bg-white text-red-500 px-4 py-2 shadow-sm rounded-md mt-2 hover:bg-gray-50 active:bg-gray-500' onClick={(() => {
                                    setIsDeleteVoucher(false);
                                    setDeletedVoucherName([]);
                                })}>Ngga Jadi</button>
                            </>
                        )}

                    </div>
                </div>
            ) : null}

            <hr />
            <div className="block mt-6 bg-white max-w-sm">
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-6">
                        <label htmlFor="nama_voucher" className="form-label inline-block mb-2 text-gray-700">Nama Voucher</label>
                        <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                            aria-describedby="voucher" placeholder="Nama Voucher" onChange={(e) => setVoucher({ ...voucher, voucher_name: e.target.value })} value={voucher.voucher_name} required />
                        <small id="voucher" className="block mt-1 text-xs text-gray-600">cth: VOUCHER HARI KEMERDEKAAN</small>
                    </div>
                    <div className="form-group mb-6">
                        <label htmlFor="voucher_code" className="form-label inline-block mb-2 text-gray-700">Voucher Code</label>
                        <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                            placeholder="Code" onChange={(e) => setVoucher({ ...voucher, voucher_code: e.target.value })} value={voucher.voucher_code} />
                        <small id="voucherCode" className="block mt-1 text-xs text-gray-600">cth: MERDEKA45</small>
                    </div>
                    <div className="form-group mb-6">
                        <label htmlFor="jumlah_diskon" className="form-label inline-block mb-2 text-gray-700">Diskon (%)</label>
                        <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                            placeholder="Jumlah Diskon" onChange={(e) => setVoucher({ ...voucher, disc: e.target.value })} value={voucher.disc} required />
                        <small id="jumlah_diskon" className="block mt-1 text-xs text-gray-600">cth: 40 = 40%</small>
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
        </div >

    )
}
