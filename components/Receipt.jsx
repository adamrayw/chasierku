import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { getVoucher, removeReceiptItem, setCustomer, setValueEmpty } from "../features/receipt/receiptSlice";
import { useCookies } from "react-cookie";
import Image from 'next/image';
import Spinner from '../public/assets/spinner.png';
import axios from "axios";
import Success from "../components/Modal/Success";

export default function Receipt() {
    const [loading, setLoading] = useState(false);
    const [cookie, setCookie] = useCookies(["user"]);
    const [cookieIncome, setCookieIncome, removeCookie] = useCookies(["income"]);
    const data = useSelector((state) => state.receipt.value);
    const subtotal = useSelector((state) => state.receipt);
    const customer = useSelector((state) => state.receipt.customer);
    const [receipt, setReceipt] = useState({
        user_id: '1',
        nama_customer: '',
        menu: [],
        subtotal: '',
        ppn: 11,
        kode_voucher: '',
        discount: '',
        total: '',
        payment_method: '',
    });
    const [active, setActive] = useState(false);
    const [success, setSuccess] = useState(false);

    const dispatch = useDispatch();

    let total = subtotal.subTotal + subtotal.subTotal * 11.0 / 100;
    let potongan;

    if (subtotal.isVoucher.isTrue) {
        potongan = (subtotal.isVoucher.value.disc / 100) * total;
        total = total - potongan;
    }

    useEffect(() => {
        getVoucher();
        handlePrintReceipt();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [total, data, dispatch]);

    useEffect(() => {
        dispatch(getVoucher());
        handlePrintReceipt();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])


    function handlePrintReceipt() {
        if (cookie.user) {
            setReceipt({
                user_id: cookie.user.data.id,
                nama_customer: receipt.nama_customer,
                menu: data,
                subtotal: subtotal.subTotal,
                ppn: 11,
                kode_voucher: subtotal.isVoucher.value.kode ?? '',
                discount: subtotal.isVoucher.value.disc ?? '',
                total: total,
            });
        }
    }

    async function sendReceipt() {
        setLoading(true);
        const formData = new FormData();
        formData.append("user_id", receipt.user_id);
        formData.append("customer_name", customer);
        formData.append("menu", JSON.stringify(receipt.menu));
        formData.append("subtotal", receipt.subtotal);
        formData.append("ppn", receipt.ppn);
        formData.append("kode_voucher", receipt.kode_voucher);
        formData.append("discount", receipt.discount);
        formData.append("total", receipt.total);
        formData.append("payment_method", receipt.payment_method);

        try {
            axios.get('/sanctum/csrf-cookie')
            const response = await axios.post('/api/transaction', formData);
            await axios.post('/api/income', {
                user_id: receipt.user_id,
                income: receipt.total + Number(cookie.income)
            });
            removeCookie('income', { path: '/' });
            setCookieIncome('income', receipt.total + Number(cookie.income), {
                path: '/',
                maxAge: 3600,
                sameSite: true,
            });
            setLoading(false);
            setActive(false);
            setSuccess(true);
            setReceipt({ ...receipt, user_id: '1', nama_customer: '', menu: [], subtotal: '', ppn: 11, kode_voucher: '', discount: '', total: '', payment_method: '' });
            dispatch(setValueEmpty())
            dispatch(setCustomer(''))
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }


    return (
        <div className="p-10 relative h-screen w-auto overflow-auto">
            {success ? (
                <div className={`modal fixed w-full h-full top-0 left-0 flex items-center justify-center`} >
                    <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" onClick={() => setSuccess(false)}></div>
                    <Success data={receipt.total} />
                </div>
            ) : null}
            {active ? (
                <div className={`modal fixed w-full h-full top-0 left-0 flex items-center justify-center`} >
                    <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" onClick={() => setActive(false)}></div>

                    <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-10 overflow-y-auto">
                        <div className="modal-content p-10 ">
                            <h2 className="text-2xl font-semibold text-gray-900">Konfirmasi Order</h2>
                            <hr className="mb-2" />
                            <div className="flex flex-col h-56 overflow-auto">
                                {receipt.menu.map((item, index) => {
                                    return (
                                        <div key={index} className="my-2 flex items-center justify-between">
                                            <Image src={item.image} alt="menu_logo" width={60} height={60} />
                                            <p>{item.qty}x {item.name}</p>
                                            <p>Rp{new Intl.NumberFormat(['ban', 'id']).format(item.price)}</p>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="mt-6 flex items-center justify-between">
                                <p className="text-xl font-medium">Subtotal</p>
                                <p className="text-gray-400">Rp{new Intl.NumberFormat(['ban', 'id']).format(receipt.subtotal)}</p>
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                                <p className="text-sm font-normal">PPN 11%</p>
                                <p className="text-gray-400">+Rp{new Intl.NumberFormat(['ban', 'id']).format(subtotal.subTotal * 11.0 / 100)}</p>
                            </div>
                            <div className="mt-2 flex items-center justify-between">
                                <p className="text-sm font-normal">Voucher</p>
                                {(subtotal.isVoucher.isTrue) ? (
                                    <div className="ppn mt-2 flex justify-between items-center">
                                        <p className="text-gray-400 mr-2">{subtotal.isVoucher.value.name} {subtotal.isVoucher.value.disc}%</p>
                                        <p className="text-gray-400">- Rp{new Intl.NumberFormat(['ban', 'id']).format(potongan)}</p>
                                    </div>
                                ) : (<p className="text-gray-400">-</p>)}
                            </div>
                            <div className="mt-6 flex items-center justify-between">
                                <p className="text-xl font-medium">TOTAL</p>
                                <p className="text-gray-800 font-bold">Rp{new Intl.NumberFormat(['ban', 'id']).format(receipt.total)}</p>
                            </div>
                            <hr />

                            <label htmlFor="payment" className="mt-4 block mb-2 text-sm font-medium text-gray-900 ">Metode Pembayaran</label>
                            <select id="payment" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-orange-500 focus:border-orange-500 block w-full p-2.5 " onChange={(e) => {
                                setReceipt({ ...receipt, payment_method: e.target.value });
                            }}>
                                <option selected>Pilih Metode Pembayaran</option>
                                <option value="Tunai">Tunai</option>
                                <option value="GoPay">GoPay</option>
                                <option value="OVO">OVO</option>
                                <option value="DANA">DANA</option>
                                <option value="LinkAja">LinkAja</option>
                                <option value="ShopeePay">ShopeePay</option>
                                <option value="BCA">Transfer Bank (Virtual Account)</option>
                            </select>
                            <small className="text-gray-500 flex items-center mt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                Siapkan QR Code sesuai metode pembayaran, dan tunjukan ke customer untuk melakukan pembayaran
                            </small>
                            <button className={`mt-6 bg-orange-500 text-white hover:bg-orange-700 active:bg-orange-800 transition-all w-full font-bold tracking-wide text-center py-4 text-xl ${loading ? 'opacity-50 cursor-not-allowed hover:bg-orange-500 shadow-lg' : ''}`} onClick={() => {
                                sendReceipt()
                            }
                            }>
                                {loading ? (
                                    <Image className='animate-spin' src={Spinner} width="20" height="20" alt='loading' />
                                ) : 'Pembayaran Selesai'}
                            </button>
                        </div>
                    </div>
                </div >
            ) : ('')}

            <div className="customer relative">

                <input type="text" className="text-center bg-gray-50 w-full p-4 border-0 focus:border-0 text-lg text-gray-500 font-semibold" name="customer" id="customer" placeholder="Nama Customer" value={customer
                } onChange={(e) => {
                    dispatch(setCustomer(e.target.value));
                }} />
            </div>
            <div className="overflow-auto h-80 scrollbar-hide mt-2">
                <div className="order my-8">
                    {(data.length === 0) ? (<p className="text-center text-gray-500 tracking-wider">Belum ada menu yang ditambahkan</p>) : null}
                    {data.map((item, index) => {
                        return (
                            <div key={index} className="flex text-2xl text-gray-600 justify-between items-center mt-6 first-of-type:mt-0">
                                <div>
                                    <h2>{item.qty}x{item.name}</h2>
                                </div>
                                <div className="flex items-center">
                                    <h2>Rp{new Intl.NumberFormat(['ban', 'id']).format(item.price)}</h2>
                                    <button onClick={() => dispatch(removeReceiptItem(item))}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>

            <hr />
            <div className="subtotal mt-4">
                <div className="flex text-2xl text-gray-600 justify-between items-center">
                    <h2>Subtotal</h2>
                    <h2>Rp{new Intl.NumberFormat(['ban', 'id']).format(subtotal.subTotal)}
                    </h2>
                </div>
                <div className="ppn mt-2 flex justify-between items-center">
                    <p className="text-gray-400">PPN 11%</p>
                    <p className="text-gray-400">+ Rp{new Intl.NumberFormat(['ban', 'id']).format(subtotal.subTotal * 11.0 / 100)}</p>
                </div>
                {(subtotal.isVoucher.isTrue) ? (
                    <div className="ppn mt-2 flex justify-between items-center">
                        <p className="text-gray-400">{subtotal.isVoucher.value.name} {subtotal.isVoucher.value.disc}%</p>
                        <p className="text-gray-400">- Rp{new Intl.NumberFormat(['ban', 'id']).format(potongan)}</p>
                    </div>
                ) : ('')}

            </div>
            <div className="total mt-4">
                <div className="flex text-2xl text-gray-600 justify-between items-center">
                    <h2>Total</h2>
                    <h2>Rp{new Intl.NumberFormat(['ban', 'id']).format(total)}</h2>
                </div>
            </div>
            <div className="some-btn my-20 space-y-4">
                <input type="text" className="border border-dashed w-full text-center py-4 text-xl" placeholder="Kode Voucher" onKeyUp={((e) => {
                    dispatch(getVoucher(e.target.value))
                    handlePrintReceipt();
                })} />

                {receipt.menu.length === 0 ? (
                    <button className={`bg-orange-500 text-white hover:cursor-not-allowed opacity-50 transition-all w-full font-bold tracking-wide text-center py-4 text-xl`} disabled>
                        Print Receipt
                    </button>
                ) : (
                    <button className={`bg-orange-500 text-white hover:bg-orange-700 active:bg-orange-800 transition-all w-full font-bold tracking-wide text-center py-4 text-xl`} onClick={() => setActive(true)}>
                        Print Receipt
                    </button>
                )}

            </div>
        </div>
    )
}
