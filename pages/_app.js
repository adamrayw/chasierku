import "../styles/globals.css";
import "@material-tailwind/react/tailwind.css";
import { Provider } from "react-redux";
import { store } from "../app/store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
