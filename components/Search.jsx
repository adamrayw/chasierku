
export default function Search() {
    return (
        <div className="flex w-1/2 max-w-md mt-10">
            <input className="border-2 border-primary border-r-0 bg-red transition h-12 px-5 pr-16 rounded-l-md rounded-r-none focus:outline-none w-full text-black text-lg focus:border-blue-500" type="search" name="search" placeholder="Search" />
            <button type="submit" className="rounded-r-md text-white bg-blue-500 mr-4 px-4 focus:bg-blue-700 transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </button>
        </div>
    )
}
