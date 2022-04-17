import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { useDispatch } from "react-redux";
import { changeTab } from "../features/receipt/receiptSlice";

export default function Tabs() {
    const [cookie, setCookie] = useCookies(['user']);
    const [cookieTab, setCookieTab] = useCookies(['tabs']);
    const [tab, setTab] = useState('default');
    const [skletonLoading, setSkeltonLoading] = useState(false);
    const [category, setCategory] = useState([]);
    const [backgroundColor, setBackgroundColor] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        getCategory();
        if (cookieTab.tabs === 'default') {
            setBackgroundColor('bg-gray-300 text-white');
        } else {
            setBackgroundColor('bg-white text-gray-600');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <button className={`text-gray-600 outline-0 focus:outline-0 font-bold shadow-sm w-40 py-3 px-6 rounded transition-all active:bg-gray-300 bg-opacity-60  focus:text-white ${cookieTab.tabs == 'default' ? 'bg-gray-300 text-white' : 'bg-white'}`} onClick={() => {
                setCookieTab('tabs', 'default')
                dispatch(changeTab('default'));
            }}>
                Semua
            </button>
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
                        <button className={`text-gray-600 outline-0 focus:outline-0 font-bold shadow-sm w-40 py-3 px-6 rounded transition-all active:bg-gray-300 bg-opacity-60  focus:text-white ${cookieTab.tabs == item.id ? 'bg-gray-300 text-white' : 'bg-white'}`} onClick={() => {
                            setTab(item.id);
                            setCookieTab('tabs', item.id)
                            dispatch(changeTab(item.id))
                        }}>
                            {item.name}
                        </button>
                    </div>
                )
            })}
        </div>
    )
}
