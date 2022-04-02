import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import axios from 'axios';
import { useCookies } from 'react-cookie';

export default function Menu() {

    const [isEditMode, setIsEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
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
            const response = await axios.get('/api/menu/' + cookie.user.data.id);
            setMenu(response.data.data.menus);
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


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('user_id', holdDataMenu.user_id);
        formData.append('category_id', holdDataMenu.category_id);
        formData.append('name', holdDataMenu.name);
        formData.append('price', holdDataMenu.price);
        formData.append('image', holdDataMenu.image);

        console.log(formData);
        try {
            const response = await axios.post('api/menu', formData);
            getMenus();
            console.log(response);
        } catch (error) {
            console.log(response);
        }
    }
    return (
        <div className="block pb-6 bg-white max-w-full">
            <div className='py-6'>
                <table>
                    <thead>
                        <tr>
                            <th className='sticky w-full top-0 px-6 py-2 text-white bg-orange-500'>
                                Gambar
                            </th>
                            <th className='sticky w-full top-0 px-6 py-2 text-white bg-orange-500'>
                                Name
                            </th>
                            <th className='sticky w-full top-0 px-6 py-2 text-white bg-orange-500'>
                                Harga
                            </th>
                            <th className='sticky w-full z-50 top-0 px-6 py-2 text-white bg-orange-500'>
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
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
                                        {item.price}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <hr />
            <div className="block mt-6 bg-white max-w-full">
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-6">
                        <label htmlFor="nama_voucher" className="form-label inline-block mb-2 text-gray-700">Nama Menu</label>
                        <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                            aria-describedby="voucher" placeholder="Nama Menu" required
                            onChange={(e) => setHoldDataMenu({ ...holdDataMenu, name: e.target.value })} />
                        <small id="voucher" className="block mt-1 text-xs text-gray-600">contoh: Coca - cola</small>
                    </div>
                    <div className="form-group mb-6">
                        <label htmlFor="voucher_code" className="form-label inline-block mb-2 text-gray-700">Gambar</label>
                        <input type="file" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                            onChange={(e) => setHoldDataMenu({ ...holdDataMenu, image: e.target.files[0] })}
                        />
                    </div>
                    <div className="form-group mb-6">
                        <label htmlFor="jumlah_diskon" className="form-label inline-block mb-2 text-gray-700">Harga</label>
                        <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                            placeholder="Harga Menu" required
                            onChange={(e) => setHoldDataMenu({ ...holdDataMenu, price: e.target.value })} />
                        <small id="jumlah_diskon" className="block mt-1 text-xs text-gray-600">contoh: 40000 = Rp40,000</small>
                    </div>
                    <div className="form-group mb-6">
                        <label htmlFor="category" className="form-label inline-block mb-2 text-gray-700">Category</label>
                        <select className="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" onChange={(e) => setHoldDataMenu({ ...holdDataMenu, category_id: e.target.value })}>
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
