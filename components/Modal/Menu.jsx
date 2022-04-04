import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import axios from 'axios';
import Edit from '../../public/assets/edit.png';
import Spinner from '../../public/assets/spinner.png';
import Delete from '../../public/assets/delete.png';
import { useCookies } from 'react-cookie';

export default function Menu() {

    const [isEditMode, setIsEditMode] = useState(false);
    const [isDeleteMenu, setIsDeleteMenu] = useState(false);
    const [deleteMenu, setDeleteMenu] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [loadingDeleteMenu, setLoadingDeleteMenu] = useState(false);
    const [skletonLoading, setSkeltonLoading] = useState(true);
    const [cookie, setCookie] = useCookies(['user']);
    const [menu, setMenu] = useState([])
    const [categories, setCategories] = useState([])
    const [holdDataMenu, setHoldDataMenu] = useState({
        user_id: cookie.user.data.id,
        category_id: '',
        image: '',
        name: '',
        price: '',
    })

    useEffect(() => {
        getMenus();
        getCategory();
    }, [getCategory, getMenus]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getMenus = async () => {
        try {
            setSkeltonLoading(true);
            const response = await axios.get('/api/menu/' + cookie.user.data.id);
            setMenu(response.data.data.menus);
            setSkeltonLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getCategory = async () => {
        try {
            const response = await axios.get('/api/category/' + cookie.user.data.id);
            setCategories(response.data.data.categories);
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteMenu = async () => {
        try {
            setLoadingDeleteMenu(true);
            const response = await axios.delete('/api/menu/' + deleteMenu.id + '/delete');
            console.log(response);
            getMenus();
            setLoadingDeleteMenu(false);
            setDeleteMenu([]);
            setIsDeleteMenu(false);
        } catch (error) {
            console.log(error);
            setLoadingDeleteMenu(false);
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('user_id', holdDataMenu.user_id);
        formData.append('category_id', holdDataMenu.category_id);
        formData.append('name', holdDataMenu.name);
        formData.append('price', holdDataMenu.price);
        formData.append('image', holdDataMenu.image);

        try {
            setLoading(true);
            const response = await axios.post('api/menu', formData);
            getMenus();
            setHoldDataMenu({ ...holdDataMenu, user_id: '', category_id: '', name: '', price: '', image: '' });
            set
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    return (
        <div className="flex flex-col md:flex-row justify-between pb-6 space-x-6 bg-white w-full">
            <div>
                <div>
                    <div className='mt-6 overflow-y-scroll h-96'>
                        <div>
                            <h2 className='text-xl font-bold text-gray-600 mb-2'>Menu</h2>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th className='sticky w-full z-50 top-0 px-6 py-2 text-white bg-orange-500'>
                                        Gambar
                                    </th>
                                    <th className='sticky w-full z-50 top-0 px-6 py-2 text-white bg-orange-500'>
                                        Name
                                    </th>
                                    <th className='sticky w-full z-50 top-0 px-6 py-2 text-white bg-orange-500'>
                                        Harga
                                    </th>
                                    <th className='sticky w-full z-50 top-0 px-6 py-2 text-white bg-orange-500'>
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {skletonLoading ? (
                                    <>
                                        <tr>
                                            <td className='px-6 py-4'>
                                                <div className='h-6 px-6 py-4 bg-gray-300 animate-pulse'></div>
                                            </td>
                                            <td className='px-6 py-4'>
                                                <div className='h-6 px-6 py-4 bg-gray-300 animate-pulse'></div>
                                            </td>
                                            <td className='px-6 py-4'>
                                                <div className='h-6 px-6 py-4 bg-gray-300 animate-pulse'></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='px-6 py-4'>
                                                <div className='h-6 px-6 py-4 bg-gray-300 animate-pulse'></div>
                                            </td>
                                            <td className='px-6 py-4'>
                                                <div className='h-6 px-6 py-4 bg-gray-300 animate-pulse'></div>
                                            </td>
                                            <td className='px-6 py-4'>
                                                <div className='h-6 px-6 py-4 bg-gray-300 animate-pulse'></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='px-6 py-4'>
                                                <div className='h-6 px-6 py-4 bg-gray-300 animate-pulse'></div>
                                            </td>
                                            <td className='px-6 py-4'>
                                                <div className='h-6 px-6 py-4 bg-gray-300 animate-pulse'></div>
                                            </td>
                                            <td className='px-6 py-4'>
                                                <div className='h-6 px-6 py-4 bg-gray-300 animate-pulse'></div>
                                            </td>
                                        </tr>
                                    </>
                                ) : null}
                                {menu.map((item) => {
                                    return (
                                        <tr key={item.id}>
                                            <td className='px-6 py-4'>
                                                <Image loader={() => item.image} src={item.image} width={60} height={60} unoptimized alt="logo" />
                                            </td>
                                            <td className='px-6 py-4'>
                                                {item.name}
                                            </td>
                                            <td className='px-6 py-4'>
                                                Rp{new Intl.NumberFormat(['ban', 'id']).format(item.price)}
                                            </td>
                                            <td className='py-4 pr-4 space-x-2 flex items-center justify-center'>
                                                <button>
                                                    <Image src={Edit} width={20} height={20} alt="edit" />
                                                </button>
                                                <button>
                                                    <Image src={Delete} width={20} height={20} alt="delete" onClick={() => {
                                                        setIsDeleteMenu(true)
                                                        setDeleteMenu(item)
                                                    }} />
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>

                    </div>
                </div>
                <div>
                    {isDeleteMenu ? (
                        <div className='bg-orange-500 text-white px-4 py-4'>
                            <p className=' text-center'>
                                {`Yakin ingin menghapus menu ${deleteMenu.name}?`}
                            </p>
                            <div className='flex items-center mt-4 justify-around'>
                                {loadingDeleteMenu ? (
                                    <Image className='animate-spin ' src={Spinner} width={20} height={20} alt="spinner" />
                                ) : (
                                    <>
                                        <button className='bg-white text-red-500 px-4 py-2 shadow-sm rounded-md mt-2 hover:bg-gray-50 active:bg-gray-500' onClick={() => handleDeleteMenu(deleteMenu)}>Ya, yakin</button>
                                        <button className='bg-white text-red-500 px-4 py-2 shadow-sm rounded-md mt-2 hover:bg-gray-50 active:bg-gray-500' onClick={(() => {
                                            setIsDeleteMenu(false);
                                            setDeleteMenu([]);
                                        })}>Ga Jadi</button>
                                    </>
                                )}

                            </div>
                        </div>
                    ) : null}
                </div>
            </div>

            <div className="block mt-6 bg-white">
                <div>
                    <h2 className='text-xl font-bold text-gray-600 mb-2'>Tambah Menu</h2>
                    <hr className='mb-4' />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-6">
                        <label htmlFor="nama_voucher" className="form-label inline-block mb-2 text-gray-700">Nama Menu</label>
                        <input
                            type="text"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                            aria-describedby="voucher"
                            placeholder="Nama Menu"
                            required
                            value={holdDataMenu.name}
                            onChange={(e) => setHoldDataMenu({ ...holdDataMenu, name: e.target.value })} />
                        <small id="voucher" className="block mt-1 text-xs text-gray-600">contoh: Coca - cola</small>
                    </div>
                    <div className="form-group mb-6">
                        <label htmlFor="voucher_code" className="form-label inline-block mb-2 text-gray-700">Gambar</label>
                        <input
                            type="file"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                            onChange={(e) => setHoldDataMenu({ ...holdDataMenu, image: e.target.files[0] })}
                        />
                    </div>
                    <div className="form-group mb-6">
                        <label htmlFor="jumlah_diskon" className="form-label inline-block mb-2 text-gray-700">Harga</label>
                        <input
                            type="text"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                            placeholder="Harga Menu"
                            value={holdDataMenu.price}
                            required
                            onChange={(e) => setHoldDataMenu({ ...holdDataMenu, price: e.target.value })} />
                        <small id="jumlah_diskon" className="block mt-1 text-xs text-gray-600">contoh: 40000 = Rp40,000</small>
                    </div>
                    <div className="form-group mb-6">
                        <label htmlFor="category" className="form-label inline-block mb-2 text-gray-700">Category</label>
                        <select
                            className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            value={holdDataMenu.category}
                            onChange={(e) => setHoldDataMenu({ ...holdDataMenu, category_id: e.target.value })}>
                            <option defaultValue={0}>Pilih Category</option>
                            {categories.map((item) => {
                                return (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                )
                            })}
                        </select>
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
        </div>
    )
}
