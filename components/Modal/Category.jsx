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
            const response = await axios.get('/api/category/' + cookie.user.data.id);
            setCategory(response.data.data.categories);
        } catch (error) {
            console.log(error);
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
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const handleDeleteCategory = async (item) => {
        try {
            const response = await axios.delete('/api/category/' + item.id + '/delete');
            getCategory();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="block mt-6 bg-white max-w-full">
            <div className='pb-6 h-48 overflow-y-auto'>
                <table>
                    <thead>
                        <tr>
                            <th className='sticky w-full top-0 px-6 py-2 text-white bg-orange-500'>
                                Nama
                            </th>

                            <th className='sticky w-full z-50 top-0 px-6 py-2 text-white bg-orange-500'>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
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
                                            <Image src={Delete} width={20} height={20} alt="delete" onClick={() => handleDeleteCategory(item)} />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <hr />
            <form onSubmit={handleSubmit}>
                <div className="form-group my-6">
                    <label htmlFor="nama_voucher" className="form-label inline-block mb-2 text-gray-700">Nama Category</label>
                    <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                        aria-describedby="voucher" placeholder="Nama Menu" required onChange={(e) => setData({ ...data, name: e.target.value })} />
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
        </div>
    )
}
