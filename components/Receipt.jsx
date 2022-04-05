import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { getVoucher, removeReceiptItem } from "../features/receipt/receiptSlice";

export default function Receipt() {
    const [customer, setCustomer] = useState('')
    const data = useSelector((state) => state.receipt.value);
    const subtotal = useSelector((state) => state.receipt);


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getVoucher());
    }, [dispatch])

    let total = subtotal.subTotal + subtotal.subTotal * 11.0 / 100;

    if (subtotal.isVoucher.isTrue) {
        let potongan = (subtotal.isVoucher.value.disc / 100) * total;
        total = total - potongan;
    }

    return (
        <div className="p-10 relative h-screen w-auto ">
            <div className="customer relative">
                <div className="bg-white rounded-full p-2 absolute top-1/2 ml-4 transform -translate-x-1/2 -translate-y-1/2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <input type="text" className="text-center bg-gray-50 w-full p-4 border-0 focus:border-0 text-lg text-gray-500 font-semibold" name="customer" id="customer" placeholder="Nama Customer" onChange={(e) => {
                    setCustomer(e.target.value)
                }} />
            </div>
            <div className="overflow-auto h-80 scrollbar-hide mt-2">
                <div className="order my-8">
                    {(data.length === 0) ? (<p className="text-center text-gray-500 tracking-wider">Belum ada menu yang ditambahkan</p>) : null}
                    {data.map((item, index) => {
                        return (
                            <div key={index} className="flex text-2xl text-gray-600 justify-between items-center mt-6 first-of-type:mt-0">
                                <div>
                                    <h2>{item.name}</h2>
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
                        <p className="text-gray-400">- {new Intl.NumberFormat(['ban', 'id']).format(potongan)}</p>
                    </div>
                ) : ('')}

            </div>
            <div className="total mt-4">
                <div className="flex text-2xl text-gray-600 justify-between items-center">
                    <h2>Total</h2>
                    <h2>Rp{new Intl.NumberFormat(['ban', 'id']).format(total)}</h2>
                </div>
            </div>
            <div className="some-btn absolute bottom-0 right-0 left-0 mb-36 space-y-4 px-10">
                <input type="text" className="border border-dashed w-full text-center py-4 text-xl" placeholder="Kode Voucher" onKeyUp={((e) => {
                    dispatch(getVoucher(e.target.value))
                })} />
                <button className="bg-orange-500 text-white hover:bg-orange-700 active:bg-orange-800 transition-all w-full font-bold tracking-wide text-center py-4 text-xl">Print Receipt</button>
            </div>
        </div>
    )
}
