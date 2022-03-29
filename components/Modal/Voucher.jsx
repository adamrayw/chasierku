import React, { useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie';

export default function Voucher() {

    const [cookie, setCookie] = useCookies(['user']);

    const [voucher, setVoucher] = useState({
        voucher_name: '',
        voucher_code: '',
        disc: '',
    })
    const [loading, setLoading] = useState(false);

    const data = {
        user_id: cookie.user.data.id,
        voucher_name: voucher.voucher_name,
        voucher_code: voucher.voucher_code,
        disc: voucher.disc,
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            axios.get('/sanctum/csrf-cookie')
            const response = await axios.post('api/voucher/store', {
                data,
                headers: {
                    "Authorization": `Bearer ${cookie.user.access_token}`,
                }
            });
            const result = response;
            console.log(result);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }

    }


    return (
        <div>
            <div className="block py-6 bg-white max-w-sm">
                <form onSubmit={handleSubmit}>
                    <div className="form-group mb-6">
                        <label htmlFor="nama_voucher" className="form-label inline-block mb-2 text-gray-700">Nama Voucher</label>
                        <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                            aria-describedby="voucher" placeholder="Nama Voucher" onChange={(e) => setVoucher({ ...voucher, voucher_name: e.target.value })} />
                        <small id="voucher" className="block mt-1 text-xs text-gray-600">cth: VOUCHER HARI KEMERDEKAAN</small>
                    </div>
                    <div className="form-group mb-6">
                        <label htmlFor="voucher_code" className="form-label inline-block mb-2 text-gray-700">Voucher Code</label>
                        <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                            placeholder="Code" onChange={(e) => setVoucher({ ...voucher, voucher_code: e.target.value })} />
                        <small id="voucherCode" className="block mt-1 text-xs text-gray-600">cth: MERDEKA45</small>
                    </div>
                    <div className="form-group mb-6">
                        <label htmlFor="jumlah_diskon" className="form-label inline-block mb-2 text-gray-700">Jumlah Diskon</label>
                        <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                            placeholder="Jumlah Diskon" onChange={(e) => setVoucher({ ...voucher, disc: e.target.value })} />
                        <small id="jumlah_diskon" className="block mt-1 text-xs text-gray-600">cth: 40 = 40%</small>
                    </div>

                    <button type="submit" className="px-6 py-2.5 bg-orange-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-orange-700 hover:shadow-lg focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out" onClick={handleSubmit}>Tambah</button>
                    {loading ? 'Loading...' : ''}
                </form>
            </div>
        </div>

    )
}
