import Image from "next/image";
import { menu } from "../data/menu.js";


export default function Menu() {
    menu.map(item => {
        console.log(item.name);
    })
    return (
        <div className='grid grid-cols-4 gap-4 mt-8'>
            {menu.map(item => {
                return (
                    <div key={item.id} className='p-4 bg-white items-center space-y-2 shadow-sm'>
                        <div className="flex justify-center items-center">
                            <Image src={item.image} width={240} height={160} alt='menu' />
                        </div>
                        <div className="text-left">
                            <h3 className='text-xl font-bold text-gray-800'>{item.name}</h3>
                            <p className='text-lg font-medium text-orange-500'>
                                Rp{item.price}
                            </p>
                        </div>
                    </div>

                )
            })}
        </div>
    )
}
