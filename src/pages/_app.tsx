import '../styles/global.css';

import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { store } from '@/redux/store';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Provider store={store}>
    <Component {...pageProps} />
    <ToastContainer />
  </Provider>
);

export default MyApp;
