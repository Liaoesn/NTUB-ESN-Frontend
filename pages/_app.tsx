import type { AppProps } from 'next/app';
import { ProSidebarProvider } from 'react-pro-sidebar';
import '../styles/main.scss';

export default function App({ Component, pageProps }: AppProps) {
  return <ProSidebarProvider>
    <Component {...pageProps} />
  </ProSidebarProvider>;
}
