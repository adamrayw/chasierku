import react, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from 'next/image'
import Menus from '../public/assets/menus.png'
import Discount from '../public/assets/discount.png'
import Label from '../public/assets/label.png'
import Back from '../public/assets/back.png'
import Logo from '../public/assets/logo.png'
import Voucher from "./Modal/Voucher";
import Menu from "./Modal/Menu";
import Category from "./Modal/Category";


export default function NavbarC() {
    const router = useRouter();
    const path = router.pathname;

    const [active, setActive] = useState(false);

    const [index, setIndex] = useState(0);

    return (
        // <!-- fixed nav -->
        <>
            <nav className="fixed bottom-0 inset-x-0 bg-black border-t border-blue-300 flex justify-between text-sm text-white uppercase font-mono">

                <Link href='/' >
                    <a className={`w-full block py-5 px-3 text-center ${(path === '/') ? 'text-white' : 'text-gray-700'} focus:text-white hover:text-white transition`}>
                        <svg className="w-6 h-6 mb-2 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Dashboard
                    </a>
                </Link>

                <Link href="/laporan" >
                    <a className={`w-full block py-5 px-3 text-center ${(path === '/laporan') ? 'text-white' : 'text-gray-700'} focus:text-white hover:text-white transition`}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        Laporan
                    </a>
                </Link>

                <div className="w-full relative block py-5 px-3 text-center text-gray-700 focus:text-white hover:text-white hover:cursor-pointer transition" onClick={(() => {
                    setActive(!active);
                })}>
                    {/* <button className="w-full" >
                    </button> */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Kelola
                </div>


                <a href="http://chasierku.herokuapp.com/" target="_blank" className=" w-full mt-4 py-5 px-3 text-xs h-6 text-center text-gray-700" rel="noreferrer">
                    <Image src={Logo} alt="logo" width={20} height={20} />
                </a>

            </nav>

            {
                active ? (
                    index === 0 ? (
                        <div className={`modal fixed w-full h-full top-0 left-0 flex items-center justify-center`} >
                            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" onClick={() => {
                                setActive(false)
                                setIndex(0)
                            }}></div>

                            <div className="modal-container bg-white w-96 mx-auto rounded shadow-lg z-10 overflow-y-auto">

                                <div className="modal-content py-4 text-left px-6">
                                    <div className="flex justify-between items-center pb-3">
                                        <p className="text-2xl font-bold text-gray-600">Apa yang ingin dikelola?</p>
                                        <div className="modal-close cursor-pointer z-50" onClick={() => setActive(false)}>
                                            <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <hr />
                                    <ul className='space-y-4 my-6'>
                                        <li>
                                            <button className='flex items-center w-full shadow px-3 py-4 rounded-xl hover:shadow-lg transition-all' onClick={() => setIndex(1)}>
                                                <Image src={Menus} width={48} height={48} alt='add-menu' />
                                                <p className='ml-2'>
                                                    Menu
                                                </p>
                                            </button>
                                        </li>
                                        <li>
                                            <button className='flex items-center w-full shadow px-3 py-4 rounded-xl hover:shadow-lg transition-all' onClick={() => setIndex(2)}>
                                                <Image src={Discount} width={48} height={48} alt='add-discount' />
                                                <p className='ml-2'>
                                                    Voucher Diskon
                                                </p>
                                            </button>
                                        </li>
                                        <li>
                                            <button className='flex items-center w-full shadow px-3 py-4 rounded-xl hover:shadow-lg transition-all' onClick={() => setIndex(3)}>
                                                <Image src={Label} width={48} height={48} alt='add-label' />
                                                <p className='ml-2'>
                                                    Kategori
                                                </p>
                                            </button>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div >
                    ) : index === 1 ? (
                        <div className={`modal fixed w-full h-full top-0 left-0 flex items-center justify-center`} >
                            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" onClick={() => {
                                setActive(false)
                                setIndex(0)
                            }}></div>

                            <div className="modal-container bg-white w-4/4 lg:w-4/8 mx-auto rounded shadow-lg z-10 overflow-y-auto">

                                <div className="modal-content py-4 text-left px-6">
                                    <div className="flex justify-between items-center pb-3">
                                        <div className="flex items-center space-x-2">
                                            <button className="w-5 h-5" onClick={() => setIndex(0)}>
                                                <Image src={Back} width={20} height={20} alt='back' />
                                            </button>
                                            <p className="text-2xl font-bold text-gray-600">Kelola Menu</p>
                                        </div>
                                        <div className="modal-close cursor-pointer z-50" onClick={() => setActive(false)}>
                                            <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <hr />
                                    <Menu />
                                </div>
                            </div>
                        </div >
                    ) : index === 2 ? (
                        <div className={`modal fixed w-full h-full top-0 left-0 flex items-center justify-center`} >
                            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" onClick={() => {
                                setActive(false)
                                setIndex(0)
                            }}></div>

                            <div className="modal-container bg-white w-4/4 lg:w-4/8 mx-auto rounded shadow-lg z-10 ">

                                <div className="modal-content py-4 text-left px-6">
                                    <div className="flex justify-between items-center pb-3">
                                        <div className="flex items-center space-x-2">
                                            <button className="w-5 h-5" onClick={() => setIndex(0)}>
                                                <Image src={Back} width={20} height={20} alt='back' />
                                            </button>
                                            <p className="text-2xl font-bold text-gray-600">Kelola Voucher</p>
                                        </div>
                                        <div className="modal-close cursor-pointer z-50" onClick={() => setActive(false)}>
                                            <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <hr />
                                    <Voucher />
                                </div>
                            </div>
                        </div >
                    ) : index === 3 ? (
                        <div className={`modal fixed w-full h-full top-0 left-0 flex items-center justify-center`} >
                            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" onClick={() => {
                                setActive(false)
                                setIndex(0)
                            }}></div>

                            <div className="modal-container bg-white w-2/3 lg:w-1/3  mx-auto rounded shadow-lg z-10 ">

                                <div className="modal-content py-4 text-left px-6">
                                    <div className="flex justify-between items-center pb-3">
                                        <div className="flex items-center space-x-2">
                                            <button className="w-5 h-5" onClick={() => setIndex(0)}>
                                                <Image src={Back} width={20} height={20} alt='back' />
                                            </button>
                                            <p className="text-2xl font-bold text-gray-600">Kelola Kategori</p>
                                        </div>
                                        <div className="modal-close cursor-pointer z-50" onClick={() => setActive(false)}>
                                            <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <hr />
                                    <Category />
                                </div>
                            </div>
                        </div >
                    ) : null
                ) : null
            }

        </>
    );
}