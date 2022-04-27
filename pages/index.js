import Head from "next/head";
import Menu from "../components/Menu";
import NavbarC from "../components/Navbar";
import Receipt from "../components/Receipt";
import Search from "../components/Search";
import Tabs from "../components/Tabs";
import { useCookies, removeCookie } from "react-cookie";
import { useEffect, useState } from "react";
import { Router, useRouter } from "next/router";
import axios from "axios";

export default function Home() {
  const router = useRouter();
  const [cookie, setCookie, removeCookie] = useCookies(["user"]);
  const [clock, setClock] = useState();
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    if (!cookie.user) {
      router.push("/auth/login");
    } else {
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  setInterval(() => {
    const date = new Date();
    setClock(
      date.toLocaleTimeString(["ban", "id"], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }, 1000);

  const handleLogOut = async () => {
    removeCookie('user', { path: '/' });
    const token = cookie.user.access_token;
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;

    try {
      await axios.post('/api/logout');
    } catch (error) {
      console.log(error);
    }

    router.push("/auth/login");
  }

  return (
    <div>
      <Head>
        <title>Chasierku</title>
        <meta name="description" content="Chasierku is point of sale system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section className="grid grid-cols-3 ">
          <div className="col-span-2 bg-gray-50 p-10 h-screen">
            <div className="flex items-center justify-between">
              {/* <Search /> */}
              <div className="relative">
                <button className="font-semibold text-gray-500 flex items-center hover:cursor-pointer" onClick={() => setDropdown(!dropdown)}>
                  👋 Selamat Datang Kembali,
                  <span className="text-orange-500 pl-2">{cookie.user ? cookie.user.data.name : ""}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 pl-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {dropdown ? (
                  <div className="absolute right-0 bg-white py-2 px-6 shadow">
                    <button className="flex items-center" onClick={handleLogOut}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 pr-1 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Log out
                    </button>
                  </div>
                ) : ''}
              </div>
              <h1 className="text-gray-500">{clock}</h1>
            </div>
            <Tabs />
            <Menu />
          </div>
          <div>
            <Receipt />
          </div>
        </section>
        <NavbarC />
      </main>
    </div>
  );
}
