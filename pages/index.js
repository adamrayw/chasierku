import Head from "next/head";
import Search from "../components/Search";
import Tabs from "../components/Tabs";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Chasierku</title>
        <meta name="description" content="Chasierku is point of sale system" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section className="grid grid-cols-3 ">
          <div className="col-span-2 bg-gray-50 p-10">
            <h1 className="text-4xl md:text-3xl font-bold text-blue-500">
              Cashierku
            </h1>
            <Search />
            <Tabs />
          </div>
          <div>right</div>
        </section>
      </main>
    </div>
  );
}
