import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import axios from 'axios';
import Edit from '../../public/assets/edit.png';
import Spinner from '../../public/assets/spinner.png';
import Delete from '../../public/assets/delete.png';
import { useCookies } from 'react-cookie';

export default function Category() {

    const [isEditMode, setIsEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [cookie, setCookie] = useCookies(['user']);
    const [category, setCategory] = useState([])
    const [skletonLoading, setSkletonLoading] = useState(false);
    const [isDeleteCategory, setIsDeleteCategory] = useState(false);
    const [deleteCategoryName, setDeleteCategoryName] = useState([]);
    const [loadingDeleteCategory, setLoadingDeleteCategory] = useState(false);
    const [data, setData] = useState({
        user_id: cookie.user.data.id,
        name: '',
    })

    useEffect(() => {
        getCategory();
    }, [getCategory]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getCategory = async () => {
        try {
            setSkletonLoading(true);
            const response = await axios.get('/api/category/' + cookie.user.data.id);
            setCategory(response.data.data.categories);
            setSkletonLoading(false);
        } catch (error) {
            console.log(error);
            setSkletonLoading(false);
        }
    }



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const response = await axios.post('/api/category', data);
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 2000)
            getCategory();
            setLoading(false);
            setData({ ...data, name: '' })
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const handleDeleteCategory = async (item) => {
        try {
            setLoadingDeleteCategory(true);
            const response = await axios.delete('/api/category/' + item.id + '/delete');
            getCategory();
            setLoadingDeleteCategory(false);
            setIsDeleteCategory(false);
        } catch (error) {
            console.log(error);
            setLoadingDeleteCategory(false);
        }
    }
    return (
        <div className="block pb-6 mt-6 bg-white max-w-full">
            <div className='pb-6 h-48 overflow-y-auto'>
                <table>
                    <thead>
                        <tr>
                            <th className='sticky w-full top-0 z-50 px-6 py-2 text-white bg-orange-500'>
                                Nama
                            </th>

                            <th className='sticky w-full z-50 top-0 z-50 px-6 py-2 text-white bg-orange-500'>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {skletonLoading ? (
                            <>
                                <tr>
                                    <td className='py-4 pr-4'>
                                        <div className='h-5 w-full bg-gray-300 rounded-lg animate-pulse'></div>
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
                                <tr>
                                    <td className='py-4 pr-4'>
                                        <div className='h-5 w-full bg-gray-300 rounded-lg animate-pulse'></div>
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
                                <tr>
                                    <td className='py-4 pr-4'>
                                        <div className='h-5 w-full bg-gray-300 rounded-lg animate-pulse'></div>
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
                            </>

                        ) : null}
                        {category.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td className='px-6 py-4'>
                                        {item.name}
                                    </td>
                                    <td className='py-4 pr-4 space-x-2 flex items-center justify-center'>
                                        <button>
                                            <Image src={Edit} width={20} height={20} alt="edit" />
                                        </button>
                                        <button>
                                            <Image src={Delete} width={20} height={20} alt="delete" onClick={() => {
                                                setIsDeleteCategory(true)
                                                setDeleteCategoryName(item)
                                            }} />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                        {skletonLoading ? null : (
                            <>
                                {
                                    category.length < 1 ? (
                                        <tr>
                                            <td className='py-4 pr-4' colSpan={2}>
                                                <div className='text-center'>
                                                    <p className='text-gray-700'>Tidak ada category</p>
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
            {isDeleteCategory ? (
                <div className='bg-orange-500 text-white px-4 py-4'>
                    <p className=' text-center'>
                        {`Dengan men-delete category ${deleteCategoryName.name} semua menu yang berkategori ${deleteCategoryName.name} akan terhapus semua`}
                    </p>
                    <div className='flex items-center mt-4 justify-around'>
                        {loadingDeleteCategory ? (
                            <Image className='animate-spin ' src={Spinner} width={20} height={20} alt="spinner" />
                        ) : (
                            <>
                                <button className='bg-white text-red-500 px-4 py-2 shadow-sm rounded-md mt-2 hover:bg-gray-50 active:bg-gray-500' onClick={() => handleDeleteCategory(deleteCategoryName)}>Mengerti</button>
                                <button className='bg-white text-red-500 px-4 py-2 shadow-sm rounded-md mt-2 hover:bg-gray-50 active:bg-gray-500' onClick={(() => {
                                    setIsDeleteCategory(false);
                                    setDeleteCategoryName([]);
                                })}>Ga Jadi Delete</button>
                            </>
                        )}

                    </div>
                </div>
            ) : null}
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="form-group my-6">
                    <label htmlFor="nama_voucher" className="form-label inline-block mb-2 text-gray-700">Nama Category</label>
                    <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                        aria-describedby="voucher" value={data.name} required onChange={(e) => setData({ ...data, name: e.target.value })} />
                    <small id="voucher" className="block mt-1 text-xs text-gray-600">contoh: Coffee, Soft Drink etc</small>
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
                    <p className='text-center mt-10 text-green-500'>Category Berhasil Ditambahkan!</p>
                ) : ''}
            </form>
        </div >
    )
}
