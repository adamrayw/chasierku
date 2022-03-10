
export default function NavbarC() {

    return (
        // <!-- fixed nav -->
        <nav className="fixed bottom-0 inset-x-0 bg-black border-t border-blue-300 flex justify-between text-sm text-white uppercase font-mono">

            <a href="#" className="w-full block py-5 px-3 text-center text-gray-700 focus:text-white hover:text-white transition">
                <svg className="w-6 h-6 mb-2 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Dashboard
            </a>

            <a href="#" className="w-full block py-5 px-3 text-center text-gray-700 focus:text-white hover:text-white transition">

                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Statistik
            </a>

            <a href="#" className="w-full block py-5 px-3 text-center text-gray-700 focus:text-white hover:text-white transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Tambah Produk
            </a>

            <p className="w-full mt-4 py-5 px-3 text-xs h-6  text-center text-gray-700">
                Powered by Chasierku
            </p>

        </nav>
    );
}