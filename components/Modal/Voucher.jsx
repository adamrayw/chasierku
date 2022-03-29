import React from 'react'

export default function Voucher() {
    return (

        <div>
            <div className="block py-6 bg-white max-w-sm">
                <form>
                    <div className="form-group mb-6">
                        <label htmlFor="nama_voucher" className="form-label inline-block mb-2 text-gray-700">Nama Voucher</label>
                        <input type="email" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none" id="exampleInputEmail1"
                            aria-describedby="emailHelp" placeholder="Enter email" />
                        <small id="emailHelp" className="block mt-1 text-xs text-gray-600">cth: VOUCHER HARI KEMERDEKAAN</small>
                    </div>
                    <div className="form-group mb-6">
                        <label htmlFor="exampleInputPassword1" className="form-label inline-block mb-2 text-gray-700">Voucher Code</label>
                        <input type="password" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none" id="exampleInputPassword1"
                            placeholder="Password" />
                        <small id="voucherCode" className="block mt-1 text-xs text-gray-600">cth: MERDEKA45</small>
                    </div>
                    <div className="form-group mb-6">
                        <label htmlFor="exampleInputPassword1" className="form-label inline-block mb-2 text-gray-700">Jumlah Diskon</label>
                        <input type="password" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none" id="exampleInputPassword1"
                            placeholder="Password" />
                        <small id="voucherCode" className="block mt-1 text-xs text-gray-600">cth: 40 = 40%</small>
                    </div>

                    <button type="submit" className="px-6 py-2.5 bg-orange-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-orange-700 hover:shadow-lg focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out">Submit</button>
                </form>
            </div>
        </div>

    )
}
