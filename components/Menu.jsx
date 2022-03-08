import Image from "next/image";

export default function Menu() {
    return (
        <div className='grid grid-cols-4 gap-4 mt-8'>
            <div className='p-4 bg-white items-center space-y-2'>
                <div className="flex justify-center items-center">
                    <Image src="/assets/menu/coffee.png" width={240} height={160} alt='menu' />
                </div>
                <div className="text-left">
                    <h3 className='text-xl font-bold text-gray-800'>Ice Coffee</h3>
                    <p className='text-lg font-medium text-blue-400'>
                        Rp 10.000
                    </p>
                </div>
            </div>
            <div className='p-4 bg-white items-center space-y-2'>
                <div className="flex justify-center items-center">
                    <Image src="/assets/menu/coffee.png" width={240} height={160} alt='menu' />
                </div>
                <div className="text-left">
                    <h3 className='text-xl font-bold text-gray-800'>Ice Coffee</h3>
                    <p className='text-lg font-medium text-blue-400'>
                        Rp 10.000
                    </p>
                </div>
            </div>
            <div className='p-4 bg-white items-center space-y-2'>
                <div className="flex justify-center items-center">
                    <Image src="/assets/menu/coffee.png" width={240} height={160} alt='menu' />
                </div>
                <div className="text-left">
                    <h3 className='text-xl font-bold text-gray-800'>Ice Coffee</h3>
                    <p className='text-lg font-medium text-blue-400'>
                        Rp 10.000
                    </p>
                </div>
            </div>
            <div className='p-4 bg-white items-center space-y-2'>
                <div className="flex justify-center items-center">
                    <Image src="/assets/menu/coffee.png" width={240} height={160} alt='menu' />
                </div>
                <div className="text-left">
                    <h3 className='text-xl font-bold text-gray-800'>Ice Coffee</h3>
                    <p className='text-lg font-medium text-blue-400'>
                        Rp 10.000
                    </p>
                </div>
            </div>

        </div>
    )
}
