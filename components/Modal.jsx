import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Menus from '../public/assets/menus.png'
import Discount from '../public/assets/discount.png'
import Label from '../public/assets/label.png'

export default function Modal(props) {

    const [isOpen, setIsOpen] = useState(props.open);
    useEffect(() => {
        setIsOpen(props.open)
    }, [props.open])

    return (
        <>
            {isOpen ? (
                <>
                    <div className={`modal fixed w-full h-full top-0 left-0 flex items-center justify-center`} onClick={() => setIsOpen(false)}>
                        <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

                        <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-10 overflow-y-auto">

                            <div className="modal-content py-4 text-left px-6">
                                <div className="flex justify-between items-center pb-3">
                                    <p className="text-2xl font-bold text-gray-600">Apa yang ingin ditambah?</p>
                                    <div className="modal-close cursor-pointer z-50" onClick={() => setIsOpen(false)}>
                                        <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                                            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                                        </svg>
                                    </div>
                                </div>
                                <hr />
                                <ul className='space-y-4 my-6'>
                                    <li>
                                        <button className='flex items-center w-full shadow px-3 py-4 rounded-xl hover:shadow-lg transition-all'>
                                            <Image src={Menus} width={48} height={48} alt='add-menu' />
                                            <p className='ml-2'>
                                                Tambah Menu
                                            </p>
                                        </button>
                                    </li>
                                    <li>
                                        <button className='flex items-center w-full shadow px-3 py-4 rounded-xl hover:shadow-lg transition-all'>
                                            <Image src={Discount} width={48} height={48} alt='add-discount' />
                                            <p className='ml-2'>
                                                Tambah Voucher Diskon
                                            </p>
                                        </button>
                                    </li>
                                    <li>
                                        <button className='flex items-center w-full shadow px-3 py-4 rounded-xl hover:shadow-lg transition-all'>
                                            <Image src={Label} width={48} height={48} alt='add-label' />
                                            <p className='ml-2'>
                                                Tambah Kategori
                                            </p>
                                        </button>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div >
                </>) : null}

        </>
    )
}
