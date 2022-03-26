import { useState } from 'react';
import { useRouter } from 'next/router';
import { useCookies, getAll } from 'react-cookie';
import axios from 'axios';

export default function Login() {
    const [cookie, setCookie] = useCookies(['user']);
    const router = useRouter();

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })

    const [userData, setUserData] = useState([]);

    const data = {
        email: loginForm.email,
        password: loginForm.password
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://chasierku.herokuapp.com/api/login', data);
            console.log(response);
            setUserData(response);
            setCookie("user", response.data, {
                path: '/',
                maxAge: 3600,
                sameSite: true,
            })
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <section className="h-screen flex justify-center items-center">
            <section className="h-screen">
                <div className="px-6 max-w-md h-full text-gray-800">
                    <div
                        className="flex flex-col xl:justify-center justify-center items-center h-full gap-6"
                    >
                        <div className='mb-6'>
                            <h1 className="text-4xl md:text-5xl font-bold"><span className="text-orange-500"> Cashierku </span><span className="font-light text-gray-400">|</span> Login</h1>
                        </div>

                        <div className="mb-12 md:mb-0">
                            <form onSubmit={handleLogin}>
                                <div className="mb-6">
                                    <input
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="exampleFormControlInput2"
                                        placeholder="Email address"
                                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                                    />
                                </div>


                                <div className="mb-6">
                                    <input
                                        type="password"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        id="exampleFormControlInput2"
                                        placeholder="Password"
                                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                                    />
                                </div>

                                <div className="flex justify-between items-center mb-6">
                                    <div className="form-group form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                            id="exampleCheck2"
                                        />
                                        <label className="form-check-label inline-block text-gray-800" htmlFor="exampleCheck2"
                                        >Remember me</label>

                                    </div >
                                </div >

                                <div className="flex justify-center text-center lg:text-left">
                                    <button
                                        type="submit"

                                        className="w-full font-bold inline-block px-7 py-3 bg-orange-500 text-white text-sm leading-snug uppercase rounded shadow-md hover:bg-orange-700 hover:shadow-lg focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out"
                                        onClick={handleLogin}

                                    >
                                        Login
                                    </button>

                                </div>
                            </form >
                        </div >
                    </div >
                </div >
            </section >
        </section >
    )
}
