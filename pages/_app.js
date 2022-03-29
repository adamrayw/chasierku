import "../styles/globals.css";
import "@material-tailwind/react/tailwind.css";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { CookiesProvider } from "react-cookie";
import axios from "axios";

axios.defaults.baseURL = "https://chasierku.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.defaults.withCredentials = true;

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </CookiesProvider>
  );
}

export default MyApp;
