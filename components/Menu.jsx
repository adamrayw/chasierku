import Image from "next/image";
// import { menu } from "../data/menu.js";
import { useDispatch, useSelector } from "react-redux";
import { addToReceipt, getSubtotal } from "../features/receipt/receiptSlice";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function Menu() {
    const [cookie, setCookie] = useCookies(["user"]);
    const [menus, setMenus] = useState([]);
    const [skletonLoading, setSkeletonLoading] = useState(false);

    const value = useSelector((state) => state.receipt.value);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getSubtotal());
    }, [dispatch, value])

    useEffect(() => {
        getMainMenu();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    // eslint-disable-next-line react-hooks/exhaustive-deps
    const getMainMenu = async () => {
        try {
            setSkeletonLoading(true);
            const response = await axios.get('/api/menu/' + cookie.user.data.id);
            setMenus(response.data.data.menus);
            setSkeletonLoading(false);
        } catch (error) {
            console.log(error);
            setSkeletonLoading(false);
        }
    }


    return (
        <div className='grid grid-cols-4 gap-4 mt-8'>
            {skletonLoading ? (
                <>
                    <div className='w-60 h-52 bg-gray-300 animate-pulse'></div>
                    <div className='w-60 h-52 bg-gray-300 animate-pulse'></div>
                    <div className='w-60 h-52 bg-gray-300 animate-pulse'></div>
                    <div className='w-60 h-52 bg-gray-300 animate-pulse'></div>
                </>
            ) : null}
            {menus.map(item => {
                return (
                    <button key={item.id} className='p-4 bg-white items-center space-y-2 shadow-sm active:bg-gray-100' onClick={() => dispatch(addToReceipt(item))}>
                        <div className="flex justify-center items-center">
                            <Image src={item.image} width={100} height={100} alt='menu' priority />
                        </div>

                        <div className="text-left">
                            <h3 className='text-xl font-bold text-gray-800'>{item.name}</h3>
                            <p className='text-lg font-medium text-orange-500'>
                                Rp
                                {new Intl.NumberFormat(['ban', 'id']).format(item.price)}
                            </p>
                        </div>
                    </button>
                )
            })}
        </div>
    )
}
