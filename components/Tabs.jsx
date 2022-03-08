
export default function Tabs() {
    return (
        <div className="flex items-center space-x-4 mt-5">
            <div>
                <button className="text-white font-bold bg-blue-500 py-3 px-6 rounded transition-all focus:bg-blue-700 focus:border-2 focus:border-white">
                    Ice Coffee
                </button>
            </div>
            <div>
                <button className="text-white font-bold bg-blue-500 py-3 px-6 rounded transition-all focus:bg-blue-700 focus:border-2 focus:border-white">
                    Hot Coffee
                </button>
            </div>
            <div>
                <button className="text-white font-bold bg-blue-500 py-3 px-6 rounded transition-all focus:bg-blue-700 focus:border-2 focus:border-white">
                    Tea
                </button>
            </div>



        </div>
    )
}
