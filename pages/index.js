import Head from "next/head";
import Menu from "../components/Menu";
import NavbarC from "../components/Navbar";
import Receipt from "../components/Receipt";
import Search from "../components/Search";
import Tabs from "../components/Tabs";
import { useCookies, getAll } from "react-cookie";

import { useEffect } from "react";
import { Router, useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [cookie, setCookie] = useCookies(["user"]);

  useEffect(() => {
    if (cookie.data) {
      router.push("/auth/login");
    } else {
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <Search />
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
