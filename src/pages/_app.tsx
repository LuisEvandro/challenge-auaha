import type { AppProps } from 'next/app'
import '../lib/firebaseClient'
import '../styles/global.scss'
import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import { Header } from '../components/header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <ToastContainer />
      <Header />

      <main>
        <div className="container">
          <Component {...pageProps} />
        </div>
      </main>
    </div>
  )
}
export default MyApp
