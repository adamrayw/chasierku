export default function Receipt() {
    return (
        <div className="p-10 relative h-screen w-auto">
            <div className="customer bg-gray-50 p-4 flex justify-between items-center">
                <div className="flex items-center">
                    <div className="bg-white rounded-full p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-lg ml-4 text-gray-500 font-semibold">Adam Ray</h2>
                    </div>
                </div>
                <div>
                    <div className="bg-gray-300 p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="order my-8">
                <div className="flex text-2xl text-gray-600 justify-between items-center">
                    <h2>Ice Coffee</h2>
                    <h2>Rp65000</h2>
                </div>
                <div className="notes mt-2">
                    <p className="text-gray-400">+ Less Sugar</p>
                </div>
            </div>
            <hr />
            <div className="subtotal mt-4">
                <div className="flex text-2xl text-gray-600 justify-between items-center">
                    <h2>Subtotal</h2>
                    <h2>Rp65000</h2>
                </div>
                <div className="ppn mt-2">
                    <p className="text-gray-400">PPN 10%</p>
                </div>
            </div>
            <div className="total mt-4">
                <div className="flex text-2xl text-gray-600 justify-between items-center">
                    <h2>Total</h2>
                    <h2>Rp71500</h2>
                </div>
            </div>
            <div className="some-btn absolute bottom-0 right-0 left-0 mb-36 space-y-4 px-10">
                <input type="text" className="border border-dashed w-full text-center py-4 text-xl" placeholder="Kode Voucher" />
                <button className="bg-orange-500 text-white hover:bg-orange-700 active:bg-orange-800 transition-all w-full font-bold tracking-wide text-center py-4 text-xl">Print Receipt</button>
            </div>
        </div>
    )
}
