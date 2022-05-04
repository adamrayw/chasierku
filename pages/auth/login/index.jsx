import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import Spinner from '../../../public/assets/spinner.png';
import axios from 'axios';
import Image from 'next/image';
import Head from 'next/head'
import Expired from '../../../public/assets/expired.svg';

export default function Login() {
    const [cookie, setCookie] = useCookies(['user']);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const [active, setActive] = useState(false);

    useEffect(() => {
        if (cookie.user) {
            router.push("/");
        } else {
            return;
        }
    })

    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    })

    const data = {
        email: loginForm.email,
        password: loginForm.password
    }

    const handleLogin = async (e) => {
        e.preventDefault();

        if (loginForm.email === '' || loginForm.password === '') {
            alert('Email atau password tidak boleh kosong!');
            return;
        }

        if (loginForm.password.length < 8) {
            alert('Password setidaknya harus lebih dari 8 karakter!');
            return;
        }


        try {
            setIsLoading(true);
            const response = await axios.post('https://chasierku.herokuapp.com/api/login', data);
            if (response.data.data.expired === null) {
                setActive(true);
                setIsLoading(false);
            } else {
                setCookie("user", response.data, {
                    path: '/',
                    maxAge: 3600,
                    sameSite: true,
                })
                setCookie('tabs', 'default', {
                    path: '/',
                    maxAge: 3600,
                    sameSite: true,
                })
                setCookie('income', response.data.data.income, {
                    path: '/',
                    maxAge: 3600,
                    sameSite: true,
                })
                setIsLoading(false);
                router.push('/');
            }


        } catch (error) {
            alert(error.message)
            setIsLoading(false);
        }
    }

    return (
        <section className="h-screen flex justify-center items-center">
            <Head>
                <title>Login</title>
            </Head>
            {active ? (
                <div className={`modal fixed w-full h-full top-0 left-0 flex items-center justify-center`} >
                    <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" onClick={() => setActive(false)}></div>

                    <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-10 overflow-y-auto">

                        <div className="modal-content p-10 text-center">
                            <div className="flex justify-between items-center p-10">
                                <Image src={Expired} alt='expired' className='max-w-xl' />
                            </div>
                            <h2 className='text-4xl font-bold text-orange-500'>Oopss..!!</h2>
                            <p className='text-sm mb-8 mt-2 text-gray-400'>Akun anda belum berlangganan atau sudah expired, silahkan berlangganan.</p>
                            <a href="http://chasierku.herokuapp.com/" className='inline-block bg-orange-500 hover:bg-orange-700 transition duration-300 active:ring-4 ring-orange-400 text-white px-4 py-2 rounded-lg'>Berlangganan</a>
                            <button className='block text-sm text-gray-400 w-full mx-auto mt-4' onClick={() => setActive(false)}>Nanti aja</button>
                        </div>
                    </div>
                </div >
            ) : ''}

            <section className="h-screen">
                <div className="px-6 max-w-md h-full  text-gray-800">
                    <div
                        className="flex flex-col xl:justify-center justify-center items-center h-full gap-6"
                    >
                        <div className='mb-6'>
                            <h1 className="text-4xl md:text-3xl font-bold">
                                <span className="text-orange-500"> Cashierku</span>
                                <span className="font-light text-gray-400"> | </span>
                                Login
                            </h1>
                        </div>

                        <div className="mb-12 md:mb-0">
                            <form onSubmit={handleLogin}>
                                <div className="mb-6">
                                    <input
                                        type="email"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                                        id="exampleFormControlInput2"
                                        placeholder="Email address"
                                        required
                                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                                    />
                                </div>


                                <div className="mb-6">
                                    <input
                                        type="password"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                                        id="exampleFormControlInput2"
                                        placeholder="Password"
                                        required
                                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                                    />
                                </div>

                                <div className="flex justify-between items-center mb-6">
                                    <div className="form-group form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-orange-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                            id="exampleCheck2"
                                        />
                                        <label className="form-check-label inline-block text-gray-800" htmlFor="exampleCheck2"
                                        >Remember me</label>

                                    </div >
                                </div >

                                <div className="flex justify-center text-center lg:text-left">
                                    <button
                                        type="submit"
                                        {...(isLoading ? 'disabled' : {})}
                                        className={`w-full font-bold inline-block px-7 py-3 bg-orange-500 text-white text-sm leading-snug uppercase rounded shadow-md hover:bg-orange-700 hover:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out ${isLoading ? 'cursor-not-allowed hover:bg-orange-500 shadow-lg opacity-50' : ''}`}
                                        {...(isLoading) ? { disabled: true } : {}}
                                        onClick={handleLogin}

                                    >
                                        {isLoading ? (<>
                                            <Image src={Spinner} alt="spinner" className="animate-spin mr-2" width={20} height={20} />
                                        </>) : 'Login'}

                                    </button>

                                </div>
                            </form >
                            <p className='my-4 text-secondary'> Belum berlangganan?  <a href="http://chasierku.herokuapp.com/" className='text-orange-500 font-semibold hover:underline'>berlangganan disini</a></p>
                        </div >
                    </div >
                </div >
            </section >
        </section >
    )
}
