import "../styles/globals.css";
import "@material-tailwind/react/tailwind.css";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { CookiesProvider } from "react-cookie";

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
