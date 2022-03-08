
export default function Register() {
    return (
        <section className="h-screen flex justify-center items-center">
            <section className="h-screen">
                <div className="px-6 h-full text-gray-800">
                    <div
                        className="flex flex-col xl:justify-center lg:justify-between justify-center items-center  h-full gap-6"
                    >
                        <div className='mb-6'>
                            <h1 className="text-4xl md:text-5xl font-bold"><span className="text-blue-600"> Cashierku </span><span className="font-light text-gray-400">|</span> Register</h1>
                        </div>
                        <div className="mb-12 md:mb-0">
                            <form>
                                <div className="mb-6">
                                    <input
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Nama Lengkap"
                                    />
                                </div>
                                <div className="mb-6">
                                    <input
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Email address"
                                    />
                                </div>

                                <div className="mb-6">
                                    <input
                                        type="password"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Password"
                                    />
                                </div>



                                <div className="flex justify-center text-center lg:text-left">
                                    <button
                                        type="button"
                                        className="w-full font-bold inline-block px-7 py-3 bg-blue-600 text-white text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                    >
                                        Register
                                    </button>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    )
}
