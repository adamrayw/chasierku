import Image from "next/image";
import { menu } from "../data/menu.js";
import { useDispatch, useSelector } from "react-redux";
import { addToReceipt } from "../features/receipt/receiptSlice";

export default function Menu() {

    const value = useSelector((state) => state.receipt.value);
    console.log(value);
    const dispatch = useDispatch();

    return (
        <div className='grid grid-cols-4 gap-4 mt-8'>
            {menu.map(item => {
                return (
                    <button key={item.id} className='p-4 bg-white items-center space-y-2 shadow-sm active:bg-gray-100' onClick={() => {
                        dispatch(addToReceipt(item))
                    }}>
                        <div className="flex justify-center items-center">
                            <Image src={item.image} width={240} height={160} alt='menu' priority />
                        </div>

                        <div className="text-left">
                            <h3 className='text-xl font-bold text-gray-800'>{item.name}</h3>
                            <p className='text-lg font-medium text-orange-500'>
                                Rp{item.price}
                            </p>
                        </div>
                    </button>
                )
            })}
        </div>
    )
}
