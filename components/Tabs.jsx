import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"

export default function Tabs() {
    const [cookie, setCookie] = useCookies(['user']);
    const [skletonLoading, setSkeltonLoading] = useState(false);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        getCategory();
    }, []);

    const getCategory = async () => {
        try {
            setSkeltonLoading(true);
            const response = await axios.get('/api/category/' + cookie.user.data.id);
            setCategory(response.data.data.categories);
            setSkeltonLoading(false);
        } catch (error) {
            console.log(error);
            setSkeltonLoading(false);
        }
    }

    return (
        <div className="flex items-center space-x-4 mt-5 overflow-x-auto">
            {skletonLoading ? (
                <>
                    <div className="w-40 h-12 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-40 h-12 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-40 h-12 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-40 h-12 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-40 h-12 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-40 h-12 bg-gray-300 rounded animate-pulse"></div>
                </>
            ) : null}
            {category.map((item) => {
                return (
                    <div key={item.id}>
                        <button className="text-gray-600 font-bold bg-white shadow-sm w-40 py-3 px-6 rounded transition-all focus:bg-gray-300 bg-opacity-60 border border-transparent focus:border focus:text-white focus:border-blue-400">
                            {item.name}
                        </button>
                    </div>
                )
            })}
        </div>
    )
}
