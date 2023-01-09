import '../styles/global.css';

import type { AppProps } from 'next/app';

import { wrapper } from '@/store';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default wrapper.withRedux(MyApp);
